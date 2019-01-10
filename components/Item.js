import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

import uuidv1 from 'uuid/v1';

const { width, height } = Dimensions.get('window');

export default class Item extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        itemList: PropTypes.array.isRequired,
        onPress: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired
    }

    changePage = (name, itemID) => {
        const onPressed = this.props.onPress;
        const typeOfComp = this.props.type;

        onPressed(name, typeOfComp, itemID);
    }

    render() {
        const itemList = this.props.itemList;

        return (
            <View style={styles.container}>
                {itemList.map((item) => {
                    const itemID = item.id; //this.changePage(item.name, itemID)

                    return (
                        <View style={styles.item} key={uuidv1()}>
                            <Text style={styles.itemID}>{'ID ' + itemID}</Text>
                            <View style={styles.linkButtonContainer}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <TouchableOpacity
                                    key={itemID}
                                    style={{
                                        width: width / 7,
                                        height: width / 13,
                                        backgroundColor: (item.color === 'normal' ? '#a8a9ad' : 'red'),
                                        borderColor: '#1a3f95',
                                        borderWidth: 0.7,
                                        borderRadius: 13,
                                        alignItems: 'center'
                                    }}
                                    activeOpacity={0.7} 
                                    onPress={this.changePage.bind(this, item.name, itemID)}>
                                    <Text style={styles.linkText}>{item.status}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a3f95",
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        paddingTop: height / 50,
        paddingLeft: width / 30,
        justifyContent: 'space-between'
    },
    itemID: {
        color: "#ffffff",
        fontSize: width / 20,
        marginRight: width / 30,
        textAlign: 'left'
    },
    linkButtonContainer: {
        flexDirection: 'row',
        marginRight: width / 20
    },
    linkText: {
        color: "#1a3f95",
        fontSize: width / 20
    },
    nameText: {
        color: 'white',
        fontSize: width / 20,
        paddingRight: width / 100
    }
});