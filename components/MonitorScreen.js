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

  /**
   * The constructor of the Monitor component.
   *
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    const siteData = this.getData();
    this.state = {
        isLoaded: false,
        name: '',
        compType: '',
        companyName: '',
        companyId: '',
        siteData: siteData
    };
  }


  changeLoadingStat = (newName, newType) => {
    const load = this.state.isLoaded;
    
    if (load) {
      this.setState({ isLoaded: false, name: newName, compType: newType });
    } else {
      this.setState({ isLoaded: true, name: newName, compType: newType });
    }
  };

  /**
   * Get the data from the server via https protocol.
   */
  getData() {

    fetch("https://t.damoa.io:8092/site/1036")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        /*
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
        */
      )
      .catch((error) => {
        this.setState({
          isLoaded: false
        })
      })

  }

  render() {
    const { isLoaded, name, compType, siteData} = this.state;
    
    const companyName = siteData.site_name;
    const companyId = 'ID '+ siteData.site;

    if (isLoaded) {
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
          itemType={siteData['sensors']['typeA']['name']}
          data={siteData['sensors']['typeA']['installed']}
          goToLink={this.changeLoadingStat}
        />
        <Card
          itemType={siteData['sensors']['typeB']['name']}
          data={siteData['sensors']['typeB']['installed']}
          goToLink={this.changeLoadingStat}
        />
        <Card
          itemType={siteData['sensors']['typeC']['name']}
          data={siteData['sensors']['typeC']['installed']}
          goToLink={this.changeLoadingStat}
        />
        <Card
          itemType={siteData['sensors']['typeD']['name']}
          data={siteData['sensors']['typeD']['installed']}
          goToLink={this.changeLoadingStat}
        />
      </View>
    );
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

