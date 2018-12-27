import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';

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
      siteData: undefined
    };
  }


  navigateToLinkScreen = (name, type) => {
    const companyID = this.state.companyID;
    const companyName = this.state.companyName;

    this.props.navigation.navigate('Link', {
      name: name,
      compType: type,
      companyID: companyID,
      companyName: companyName
    });
  }

  /**
   * Get the data by using https protocol when the component is mounted.
   */
  componentDidMount() {
    fetch("https://t.damoa.io:8092/site/1036")
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

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.company}>
            <Text style={styles.companyText}>{companyName}</Text>
          </View>
          <View style={styles.companyID}>
            <Text style={styles.companyID_Text}>{companyID}</Text>
          </View>
          <Card
            itemType={siteData['sensors'][0]['category']}
            data={siteData['sensors'][0]['installed']}
            goToLink={this.navigateToLinkScreen}
          />
          <Card
            itemType={siteData['sensors'][1]['category']}
            data={siteData['sensors'][1]['installed']}
            goToLink={this.navigateToLinkScreen}
          />
          <Card
            itemType={siteData['sensors'][2]['category']}
            data={siteData['sensors'][2]['installed']}
            goToLink={this.navigateToLinkScreen}
          />
          <Card
            itemType={siteData['sensors'][3]['category']}
            data={siteData['sensors'][3]['installed']}
            goToLink={this.navigateToLinkScreen}
          />
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
