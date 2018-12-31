
import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    AsyncStorage
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

  state = {
    email: undefined,
    password: undefined
  }

  storeID = async () => {
    try {
      const email = this.state.email;

      await AsyncStorage.setItem('email', email);

      await AsyncStorage.removeItem('email');

      this.props.navigation.navigate('Monitor');

    } catch {
      alert('failed to store email');
    }
  }

  handleEmail = (email) => {
    this.setState({email: email});
  }

  handlePassword = (pw) => {
    this.setState({password: pw});
  }

  render() {

    return(
      <View style={styles.container}>
        <Image style={styles.logoImage} source= {require('../assets/sucatch1.jpg')} />
        <TextInput style={styles.inputBox} 
        placeholder="Email"
        placeholderTextColor = "#1a3f95"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={this.handleEmail}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox} 
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor = "#1a3f95"
        onChangeText={this.handlePassword}
        ref={(input) => this.password = input}
        />
        <TouchableOpacity style={styles.buttonBox} onPress={() => this.storeID()}>
          <Text style={styles.buttonText}>"Login"</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> 등록 아이디가 없다면... </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
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
    logoImage: {
      width: width / 5,
      height: height / 6,
      marginBottom: height / 10,
      marginTop: height / 20
    },
    signupTextCont: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent : 'flex-end',
      paddingVertical: 10,
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
    inputBox: {
      width: width * 4/5,
      height: height / 15,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: width / 25,
      color: '#ffffff',
      marginVertical: 5
    },
    buttonBox: {
      width: width * 4/5,
      height: height / 15,
      backgroundColor: '#a8a9ad',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 5
    },
    buttonText: {
      fontSize : width / 25,
      fontWeight: '500',
      color: "#ffffff",
      textAlign: 'center'
    }
});
