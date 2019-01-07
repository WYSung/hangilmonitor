
import React, {Component} from 'react';
//import { View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity,Dimensions} from 'react-native';

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

export default createAppContainer(AppStackNavigator);

