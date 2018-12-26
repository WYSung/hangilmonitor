import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';

import Card from './Card';
import Link from './LinkScreen';

const { width, height } = Dimensions.get('window');


export default class Monitor extends React.Component {
  static navigationOptions = {
    title: '한길하수처리모니터링',
    headerStyle: {
      backgroundColor: '#1a3f95',
    },
    headerTintColor: '#fff',
  };


  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      linkLoaded: false,
      name: '',
      compType: '',
      siteData: undefined
    };
    this.getData()
  }


  changeLoadingStat = (newName, newType) => {
    const load = this.state.linkLoaded;

    if (load) {
      this.setState({ linkLoaded: false, name: newName, compType: newType });
    } else {
      this.setState({ linkLoaded: true, name: newName, compType: newType });
    }
  };

  getData() { //componentDidMount
    fetch("https://t.damoa.io:8092/site/1036")
      .then(res => res.json())
      .then(
        (result) => {

          console.log(result)
          this.setState({
            isLoaded: true,
            siteData: result
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
          console.log('fml')
        }
      )
  }

  render() {
    const { isLoaded, linkLoaded, name, compType, siteData } = this.state;

    if (isLoaded) {
      const companyName = siteData['name']
      const companyId = 'ID ' + siteData['id'];

      if (linkLoaded) {
        return (
          <Link
            name={name}
            goBack={this.changeLoadingStat}
            compType={compType}
            companyId={companyId}
            companyName={companyName}
          />
        );
      }

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.company}>
            <Text style={styles.companyText}>{companyName}</Text>
          </View>
          <View style={styles.companyID}>
            <Text style={styles.companyID_Text}>{companyId}</Text>
          </View>
          <Card
            itemType={siteData['sensors'][0]['category']}
            data={siteData['sensors'][0]['installed']}
            goToLink={this.changeLoadingStat}
          />
          <Card
            itemType={siteData['sensors'][1]['category']}
            data={siteData['sensors'][1]['installed']}
            goToLink={this.changeLoadingStat}
          />
          <Card
            itemType={siteData['sensors'][2]['category']}
            data={siteData['sensors'][2]['installed']}
            goToLink={this.changeLoadingStat}
          />
          <Card
            itemType={siteData['sensors'][3]['category']}
            data={siteData['sensors'][3]['installed']}
            goToLink={this.changeLoadingStat}
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
    paddingBottom: 10,
    marginTop: 20,
  },
  companyText: {
    color: '#ffffff',
    fontSize: 18,
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
    fontSize: 14,
    paddingLeft: 15,
    paddingBottom: 10,
  },
});
