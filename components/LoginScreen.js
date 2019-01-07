
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
    title: '지능형 IoT 모니터링',
    headerStyle: {
      backgroundColor: '#1a3f95',
    },
    headerTintColor: '#fff',
  };

  state = {
    id: undefined,
    pw: undefined
  }

  componentDidMount = () => {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const id = await AsyncStorage.getItem('id', undefined);
    const pw = await AsyncStorage.getItem('pw', undefined);

    this.setState({id: id, pw: pw});
  }

  storeID = async () => {
    try {
      const {id, pw} = this.state;

      await AsyncStorage.setItem('id', id);

      await AsyncStorage.setItem('pw', pw);

      this.props.navigation.navigate('Monitor', {id: id, pw: pw});

    } catch {
      alert('failed to store id');
    }
  }

  removeID = async () => {
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('pw');
  }


  render() {

    return(
      <View style={styles.container}>
        <Image style={styles.logoImage} source= {require('../assets/sucatch1.jpg')} />
        <TextInput style={styles.inputBox} 
        placeholder="ID"
        placeholderTextColor = "#1a3f95"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(id) => this.setState({id: id})}
        value={this.state.id}
        onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox} 
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor = "#1a3f95"
        onChangeText={(pw) => this.setState({pw: pw})}
        value={this.state.pw}
        ref={(input) => this.password = input}
        />
        <TouchableOpacity style={styles.loginButtonBox} onPress={() => this.storeID()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButtonBox}>
          <Text style={styles.buttonText} onPress={() => this.removeID()}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1a3f95',
      flexGrow: 1,
      alignItems: 'center',
    },
    logoImage: {
      width: height / 6,
      height: height / 6,
      marginBottom: height / 10,
      marginTop: height / 20
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
    loginButtonBox: {
      width: width * 4/5,
      height: height / 15,
      backgroundColor: '#a8a9ad',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 5,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize : width / 25,
      fontWeight: '500',
      color: "#ffffff",
      textAlign: 'center'
    },
    removeButtonBox: {
      width: width * 4 / 5,
      height: height / 15,
      backgroundColor: '#a8a9ad',
      borderRadius: 25,
      paddingVertical: 5,
      justifyContent: 'center'
    }
});
