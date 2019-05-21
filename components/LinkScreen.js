import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    WebView,
    ActivityIndicator
} from 'react-native';
//import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');
const INJECTED_JS = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=3.0, user-scalable=3.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

export default class Link extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: true,
        count: 0,
        name: '',
        companyName: '',
        itemID: '',
        url: 'https://t.damoa.io:8092/graph?quick='
    }

    hideSpinner() {
        this.setState({ visible: false });
    }

    makeSpinnerVisible() {
        this.setState({ visible: true });
    }

    countTimeout = () => {
        const {count} = this.state;
        this.setState({ count: count + 1 });

        if (count < 4) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Set the size of the navigation header with suitable height and suitable font size.
     */
    static navigationOptions = {
        title: '지능형 IoT 모니터링',
        headerStyle: {
            backgroundColor: '#1a3f95',
            height: height / 10
        },
        headerTitleStyle: {
            fontSize: width / 20
        },
        headerTintColor: '#fff',
    };

    componentDidMount = () => {
        const name = this.props.navigation.getParam('name', undefined);
        const companyName = this.props.navigation.getParam('companyName', undefined);
        const itemID = this.props.navigation.getParam('itemID', undefined);

        const url = 'https://t.damoa.io:8092/graph'//'https://t.damoa.io:8092/graph?quick=' + itemID;

        this.setState({ name: name, companyName: companyName, itemID: itemID, url: url});
    };

    render() {
        // const compType = this.props.navigation.getParam('compType', undefined);
        // const companyId = this.props.navigation.getParam('companyID', undefined);
        // const componentName = `${compType} ${companyId}`;

        let WebViewRef;
        let {visible, name, companyName, itemID, url} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{companyName}</Text>
                    <Text style={styles.companyID}>{name}</Text>
                </View>
                {/*<View style={styles.componentView}>
                    <Text style={styles.componentName}>{componentName}</Text>
                    <Text style={styles.componentName}>{itemID}</Text>
                </View>*/}
                <View style={{ justifycontent: 'flex_end', alignItems: 'center', marginTop: 10, width: width, height: height / 4 * 3 }}>
                    <WebView
                        injectedJavaScript={INJECTED_JS}
                        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
                        source={{ uri: url }}
                        style={{ marginTop: 5, width: width }}
                        scalesPageToFit={false}
                        onLoadEnd={() => {this.hideSpinner()}}
                        onError={() => {
                            if (this.countTimeout()) {
                                this.makeSpinnerVisible();
                                WebViewRef.reload();
                            } else {
                                this.props.navigation.goBack();
                            }
                        }} //reload on error
                    />
                    {visible && (
                        <ActivityIndicator
                            style={{ position: "absolute", top: height / 3, left: width / 2 }}
                            size="large"
                        />
                    )}
                </View>
            </View>
        );
    }
}

// stylesheet of the link screen
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
        fontSize: width / 25,
        paddingVertical: height / 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    date_highlighted: {
        color: '#0bb7b4',
        fontSize: width / 25,
        marginLeft: width / 20
    },
    date_normal: {
        color: 'grey',
        fontSize: width / 25,
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
