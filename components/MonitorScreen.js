import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import uuidv1 from 'uuid/v1';

import Card from './Card';

const { width, height } = Dimensions.get('window');


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

    this.props.navigation.navigate('Link', {
      name: name,
      compType: type,
      companyID: companyID,
      companyName: companyName,
      itemID: itemID,
    });
  }

  /**
   * Get the data by using https protocol when the component is mounted.
   */
  componentDidMount() {

    const id = this.props.navigation.getParam('id', '0000');
    const pw = this.props.navigation.getParam('pw', '1004');

    const temp_url = 'https://t.damoa.io:8092/site/' + id + '/' + pw;

    console.log(temp_url);

    fetch(temp_url)
      .then(res => res.json())
      .then(
        (result) => {
          const companyName = result['name'];
          const companyId = 'ID ' + result['id'];

          this.setState({
            isLoaded: true,
            siteData: result,
            companyName: companyName,
            companyID: companyId
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }
 
  render() {
    const { isLoaded, companyID, companyName, siteData } = this.state;

    if (isLoaded) {

      let cards = siteData['sensors'].map(sensor => {
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

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.company}>
            <Text style={styles.companyText}>{companyName}</Text>
          </View>
          <View style={styles.companyID}>
            <Text style={styles.companyID_Text}>{companyID}</Text>
          </View>
          {cards}
        </View>
      );

    } else {
      return(
        <View>
          <Text>Please wait for few seconds.. </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width,
    height: height,
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
});
