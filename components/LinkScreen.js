import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    WebView
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Link extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        one_day: true,
        seven_day: false,
        selected: 1
    }


    /**
     * Set the size of the navigation header with suitable height and suitable font size.
     */
    static navigationOptions = {
      title: '한길하수처리모니터링',
      headerStyle: {
        backgroundColor: '#1a3f95',
        height: height / 10
      },
      headerTitleStyle: {
          fontSize: width / 20
      },
      headerTintColor: '#fff',
    };

    render() {
        const name = this.props.navigation.getParam('name', undefined);
        const compType = this.props.navigation.getParam('compType', undefined);
        const companyId = this.props.navigation.getParam('companyID', undefined);
        const companyName = this.props.navigation.getParam('companyName', undefined);
        const itemID = this.props.navigation.getParam('itemID', undefined);
        const componentName = `${compType} ${name}`;

        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{companyName}</Text>
                    <Text style={styles.companyID}>{companyId}</Text>
                </View>
                <View style={styles.componentView}>
                    <Text style={styles.componentName}>{componentName}</Text>
                    <Text style={styles.componentName}>{itemID}</Text>
                </View>
                <View style={{ justifycontent: 'flex_end', alignItems:'center', marginTop: 10, width: width, height: height / 4 * 3 }}>
                    <WebView
                        source={{ uri: 'http://t.damoa.io:8090/graph?item=401016E0' }} 
                        style={{ marginTop: 5, width: width }}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1a3f95'
    },
    companyInfo: {
        width: width,
        backgroundColor: '#1a3f95',
    },
    companyName: {
        color: 'white',
        fontSize: width / 15,
        fontWeight: 'bold',
        marginLeft: width / 20,
        paddingTop: height / 40
    },
    companyID: {
        color: 'white',
        fontSize: width / 20,
        marginLeft: width / 20,
        paddingTop: height / 40
    },
    componentView: {
        width: width,
        backgroundColor: '#1a3f95',
        flexDirection: 'row',
    },
    componentName: {
        color: '#0bb7b4',
        fontSize: width / 20,
        marginLeft: width / 20,
        paddingTop: 10
    },
    dateRangePicker: {
        width: width,
        backgroundColor: '#1a3f95',
        fontSize : width / 25,
        paddingVertical: height / 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    date_highlighted: {
        color: '#0bb7b4',
        fontSize : width / 25,
        marginLeft: width / 20
    },
    date_normal: {
        color: 'grey',
        fontSize : width / 25,
        marginLeft: width / 20
    },
    oneDayContainer: {
        borderRightWidth: 1.1,
        borderRightColor: 'darkgray',
        width: width / 6
    },
    sevenDayContainer: {
        width: width / 6
    },
    dataContainer: {
        alignItems: 'center'
    },
    dataButtons: {
        width: width / 6 * 5,
        flexDirection: 'row'
    },
    dataButton: {
        width: width / 4,
        height: height / 25,
        backgroundColor: 'lightgrey',
        borderColor: 'lightgrey',
        marginTop: height / 30,
        marginRight: width / 25,
        borderWidth: 0.7,
        alignItems: 'center',
        borderRadius: 13
    },
    dataButtonText: {
        fontSize: width / 25,
        color: 'grey'
    },
    dataButton_selected: {
        width: width / 4,
        height: height / 25,
        marginTop: height / 30,
        marginRight: width / 25,
        alignItems: 'center',
        borderRadius: 13,
        backgroundColor: '#0bb7b4'
    },
    dataButtonText_selected: {
        fontSize: width / 20,
        color: 'white'
    }
});
