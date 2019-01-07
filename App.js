
import { AsyncStorage } from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation'
import WelcomeScreen from './components/WelcomeScreen'
import Monitor from './components/MonitorScreen'
import LoginScreen from   './components/LoginScreen'
import Link from './components/LinkScreen'

const AppStackNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen},
  Login: { screen: LoginScreen },
  Monitor: {screen: Monitor},
  Link: { screen: Link},
});

const LoggedInStackNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Monitor: { screen: Monitor },
  Link: { screen: Link },
});

checkLoggedIn = async () => {
  const id = await AsyncStorage.getItem('id', undefined);

  return id;
}

const navigator = (checkLoggedIn() ? LoggedInStackNavigator : AppStackNavigator);

export default createAppContainer(navigator);
