
import React, {Component} from 'react';
//import { View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity,Dimensions} from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation'
import WelcomeScreen from './components/WelcomeScreen'
import Monitor from './components/MonitorScreen'
import LoginScreen from   './components/LoginScreen'
import Signup from './components/SignupScreen'

const AppStackNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen},
  Monitor: {screen: Monitor},
  Login: {screen: LoginScreen},
  Signup: {screen: Signup},
});

export default createAppContainer(AppStackNavigator);

