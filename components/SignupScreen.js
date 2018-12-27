
import React, {Component} from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput 
} from 'react-native';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
//import Logo from './Logo';
//import Form from './Form';
export default class Signup extends React.Component {
  static navigationOptions = {
    title: '한길하수처리모니터링',
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
        <Image style={{width:200, height:200}}
          source= {require('../assets/sucatch1.jpg')} />
        <Text style={styles.logoText}>한길 하수처리 모니터링</Text>
        <TextInput style={styles.inputBox} 
        placeholder="Email"
        placeholderTextColor = "#1a3f95"
        selectionColor="#fff"
        keyboardType="email-address"
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox} 
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor = "#1a3f95"
        ref={(input) => this.password = input}
        />
        <TouchableOpacity style={styles.buttonBox}>
          <Text style={styles.buttonText}>"Login"</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> 등록했으니 이제 로긴하러가요. </Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.signupButton}> 로그인 </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }   
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1a3f95',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    signupTextCont: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent : 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signupText: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16
    },
    signupButton: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: '500'
    },
    logoText: {
      marginVertical: 15,
      fontSize: 18,
      color:'#a8a9ad'
    },
    inputBox: {
      width: 300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10
    },
    buttonBox: {
      width: 300,
      backgroundColor: '#a8a9ad',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
    },
    buttonText: {
      fontSize : 16,
      fontWeight: '500',
      color: "#ffffff",
      textAlign: 'center'
    }
});
