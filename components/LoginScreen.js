
import React, {Component} from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {

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
        <Image style={{width:width / 8, height:height / 10}}
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
        <TouchableOpacity style={styles.buttonBox} onPress={() => navigate('Monitor')}>
          <Text style={styles.buttonText}>"Login"</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> 등록 아이디가 없다면... </Text>
          <TouchableOpacity onPress={() => navigate('Signup')}>
            <Text style={styles.signupButton}> 회원가입 </Text>
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
      fontSize: width / 25
    },
    signupButton: {
      color: "#ffffff",
      fontSize: width / 25,
      fontWeight: '500'
    },
    logoText: {
      marginVertical: height / 50,
      fontSize: width / 20,
      color:'#a8a9ad'
    },
    inputBox: {
      width: width * 4/5,
      height: height / 10,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: width / 18,
      color: '#ffffff',
      marginVertical: 10
    },
    buttonBox: {
      width: width * 4/5,
      height: height / 10,
      backgroundColor: '#a8a9ad',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
    },
    buttonText: {
      fontSize : width / 18,
      fontWeight: '500',
      color: "#ffffff",
      textAlign: 'center'
    }
});
