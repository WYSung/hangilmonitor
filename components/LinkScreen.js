import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native';

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

//const BACKBUTTON = require('../assets/goBack.png');

export default class Link extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        one_day: true,
        seven_day: false,
        selected: 1
    }

    convertDateRange = () => {
        const one_day = this.state.one_day;

        //TODO use AJAX or something to get new data

        if (one_day) {
            this.setState({ one_day: false, seven_day: true });
        } else {
            this.setState({ one_day: true, seven_day: false });
        }
    }

    selectDataButton = (newValue) => {
        this.setState({selected: newValue});
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        compType: PropTypes.string.isRequired,
        goBack: PropTypes.func.isRequired,
        companyID: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired
    }

    static navigationOptions = {
      title: '한길하수처리모니터링',
      headerStyle: {
        backgroundColor: '#1a3f95',
      },
      headerTintColor: '#fff',
    };

    render() {
        const {name, goBack, compType, companyId, companyName} = this.props;
        const componentName = `${compType} ${name}`;

        const {one_day, seven_day, selected} = this.state;

        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{companyName}</Text>
                    <Text style={styles.companyID}>{companyId}</Text>
                </View>
                <View style={styles.componentView}>
                    <Text style={styles.componentName}>{componentName}</Text>
                </View>
                <View style={styles.dateRangePicker}>
                    <View style={styles.oneDayContainer}>
                        <Text onPress={this.convertDateRange} style={one_day ? styles.date_highlighted : styles.date_normal}>1일</Text>
                    </View>
                    <View style={styles.sevenDayContainer}>
                        <Text onPress={this.convertDateRange} style={seven_day ? styles.date_highlighted : styles.date_normal}>7일</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.dataButtons}>
                        <TouchableOpacity 
                            style={(selected === 1) ? styles.dataButton_selected : styles.dataButton} 
                            onPress={() => {this.selectDataButton(1)}}
                            >
                            <Text style={(selected === 1) ? styles.dataButtonText_selected : styles.dataButtonText}>
                                운전시간
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={(selected === 2) ? styles.dataButton_selected : styles.dataButton} 
                            onPress={() => { this.selectDataButton(2) }}
                            >
                            <Text style={(selected === 2) ? styles.dataButtonText_selected : styles.dataButtonText}>
                                운전횟수
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={(selected === 3) ? styles.dataButton_selected : styles.dataButton} 
                            onPress={() => { this.selectDataButton(3) }}
                            >
                            <Text style={(selected === 3) ? styles.dataButtonText_selected : styles.dataButtonText}>
                                사용전력
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifycontent: 'flex_end', alignItems:'center', marginTop: 10, width: width, height: height / 3 }}>
                    <WebView
                        source={{ uri: 'http://t.damoa.io:8090/graph?item=401016E0' }} 
                        style={{ marginTop: 5, width: width / 4 * 3 }}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flowDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a3f95'
    },
    companyInfo: {
        width: width,
        backgroundColor: '#1a3f95',
    },
    companyName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: width / 20,
        paddingTop: 10
    },
    companyID: {
        color: 'white',
        fontSize: 18,
        marginLeft: width / 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    componentView: {
        width: width,
        backgroundColor: '#1a3f95',
    },
    componentName: {
        color: '#0bb7b4',
        fontSize: 18,
        marginLeft: width / 20,
        paddingTop: 10
    },
    dateRangePicker: {
        width: width,
        backgroundColor: '#1a3f95',
        fontSize : 18,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    date_highlighted: {
        color: '#0bb7b4',
        fontSize : 18,
        marginLeft: width / 20
    },
    date_normal: {
        color: 'grey',
        fontSize : 18,
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
        fontSize: 18,
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
        fontSize: 20,
        color: 'white'
    }
});