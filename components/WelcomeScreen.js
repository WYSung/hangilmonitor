
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
            resizeMode= 'contain'
            resizeMethod= 'auto'
            style={styles.welcomeScreenImage}
            source={require('../assets/sucatchCover.jpg')}
          />
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
      justifyContent: 'center'
    },
    welcomeScreenImage: {
      width: width,
      height: height - 70
    }
});
