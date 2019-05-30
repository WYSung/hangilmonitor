import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  StatusBar, 
  ScrollView,
  WebView
} from 'react-native';
import uuidv1 from 'uuid/v1';

import Card from './Card';
import registerForPushNotificationsAsync from './pushNotification'; //TODO need to test


const { width, height } = Dimensions.get('window');

const NOT_REGISTERED = "미입력";

export default class Monitor extends Component {

  /* Make the navigation header invisible. */
  static navigationOptions = {
    header: null
  };


  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      companyID: '',
      companyName: '',
      siteData: undefined,
      url: '',
      isEmpty: false
    };
  }

  /**
   * This function works as a navigator, which navigates the screen to the linke screen.
   *
   * @param {name}
   * @param {type}
   * @param {itemID}
   */
  navigateToLinkScreen = (name, type, itemID) => {
    const companyID = this.state.companyID;
    const companyName = this.state.companyName;

    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    this.props.navigation.navigate('Link', {
      name: name,
      compType: type,
      companyID: companyID,
      companyName: companyName,
      itemID: itemID,
    });
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  fetchData = () => {
    const id = this.props.navigation.getParam('id', '0000');
    const pw = this.props.navigation.getParam('pw', 'suho1004');

    //http -> http://t.damoa.io:8090/site/
    const url = 'https://t.damoa.io:8092/site/' + id + '/' + pw;

    this.setState({ url: url });
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          const companyName = result['name'];
          const companyId = 'ID ' + result['id'];

          let i;
          let checker = true;
          let sensors = result['sensors'];

          for (i = 0; i < sensors.length; i++) {
            if (sensors[i]['installed'].length != 0) {
              checker = false;
              break;
            }
          }

          this.setState({
            isLoaded: true,
            siteData: result,
            companyName: companyName,
            companyID: companyId,
            isEmpty: checker
          });
        }
      )
      .catch((error) => {
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        //console.log(error);
        console.log('error!!')
        this.setState({
          isLoaded: false
        });
      });
  }

  /**
   * Get the data by using https protocol when the component is mounted.
   */
  componentDidMount() {
    this.fetchData();
    registerForPushNotificationsAsync();
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
 
  render() {
    const { isLoaded, companyID, companyName, siteData, isEmpty } = this.state;

    if (isLoaded) {

      let cards;

      if (siteData.name == NOT_REGISTERED && siteData.zip == NOT_REGISTERED) {

        cards = (
          <View style={styles.registerContainer}>
            <Text style={styles.registerMessage}>고객 등록 후 로그인 해주세요</Text>
            <Text style={styles.registerMessage}>고객 등록은 한길 자연 임채중 이사님</Text>
            <Text style={styles.contactMessage}>(010-XXXX-YYYY name@hangile.com)</Text>
          </View>
        );

      } else if (isEmpty) {

        cards = (
          <View style={styles.noInstalledContainer}>
            <Text style={styles.noInstalledMessage}>설치된 기기가 없습니다</Text>
          </View>
        );

      } else {
        cards = siteData['sensors'].map(sensor => {
          if (sensor.installed.length > 0) {
            return (
              <Card
                itemType={sensor['category']}
                data={sensor['installed']}
                goToLink={this.navigateToLinkScreen}
                key={uuidv1()}
              />
            );
          }
        });
      }

      return (
        <ScrollView 
          contentContainerStyle={styles.container} 
          scrollEnabled={true}
          indicatorStyle={'white'}>
          <StatusBar barStyle="light-content" />
          <View style={styles.company}>
            <Text style={styles.companyText}>{companyName}</Text>
          </View>
          <View style={styles.companyID}>
            <Text style={styles.companyID_Text}>{companyID}</Text>
          </View>
          {cards}
          <View style={{width: 0, height: 0, overflow: "hidden"}}>
            <WebView source={{ uri: 'https://t.damoa.io:8092/graph?quick=401017E5', width: 0, height: 0 }} style={{width:0, height: 0}} />
          </View>
        </ScrollView>
      );

    } else {
      return(
        <View style={styles.container}>
          <Text style={styles.loadingText}>Please wait for few seconds.. </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a3f95',
  },
  company: {
    backgroundColor: '#1a3f95',
    width: width,
    paddingVertical: height / 40,
    marginTop: height / 20,
  },
  companyText: {
    color: '#ffffff',
    fontSize: width / 15,
    paddingLeft: 15,
  },
  companyID: {
    backgroundColor: '#1a3f95',
    width: width,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 0.5,
  },
  companyID_Text: {
    color: '#ffffff',
    fontSize: width / 20,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  registerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height / 3 * 2,
    backgroundColor: '#1a3f95',
  },
  registerMessage: {
    color: 'white',
    fontSize: width / 20
  },
  contactMessage: {
    color: 'white',
    fontSize: width / 20
  },
  noInstalledContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height / 3 * 2,
    backgroundColor: '#1a3f95',
  },
  noInstalledMessage: {
    color: 'white',
    fontSize: width / 20
  },
  loadingText: {
    color: '#ffffff',
    fontSize: width / 25,
    paddingLeft: 15,
  },
});
