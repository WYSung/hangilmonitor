
import React, {Component} from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions
    } from 'react-native';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: '한길 하수처리 모니터링',
    headerStyle: {
      backgroundColor: '#1a3f95',
    },
    headerTintColor: '#fff',
  };
  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
          <StatusBar 
          BackgroundColor="1a3f95" 
          barStyle="light-content" 
          />
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Image
            resizeMode= 'containe'
            resizeMethod= 'auto'
            style={{width:width,height:height-60}}
            source={require('../assets/sucatchCover.jpg')}
          />
        </TouchableOpacity>
      </View>
    );
  }   
}

/*
export default class WelcomeScreen extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }   
}


        <StatusBar 
          BackgroundColor="1a3f95" 
          barStyle="light-content" 
          />
        <TouchableOpacity onPress={() => this.props.navigtion.navigate('Login')}>
            <Image style={{width:100, height:100}}
              source= {require('../assets/sucatch.png')} />
        </TouchableOpacity>
*/

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1a3f95',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});
