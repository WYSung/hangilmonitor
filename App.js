import React from 'react';
import { AsyncStorage } from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation'
import WelcomeScreen from './components/WelcomeScreen'
import Monitor from './components/MonitorScreen'
import LoginScreen from   './components/LoginScreen'
import Link from './components/LinkScreen'

const AppStackNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen},
  Monitor: {screen: Monitor},
  Link: { screen: Link},
  Login: { screen: LoginScreen },
});

const LoggedInStackNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Monitor: { screen: Monitor },
  Link: { screen: Link },
});

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  }
  checkLoggedIn = async () => {
    const id = await AsyncStorage.getItem('id');

    if (id) {
      this.setState({isLoggedIn: true});
    }
  }

  componentWillMount = () => {
    this.checkLoggedIn();
  }

  render() {
    const {isLoggedIn} = this.state;

    let Container;

    if (isLoggedIn) {
      Container = createAppContainer(LoggedInStackNavigator);
    } else {
      Container = createAppContainer(AppStackNavigator);
    }

    return (<Container></Container>)
  }
}
