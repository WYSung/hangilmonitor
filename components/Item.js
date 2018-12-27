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
        columnNum: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired
    }

    changePage = (name) => {
        const onPressed = this.props.onPress;
        const typeOfComp = this.props.type;

        onPressed(name, typeOfComp);
    }

    render() {
        const {itemList, columnNum, onPressed, type} = this.props;

        let items = itemList.map(item => {
            return (
                <View style={styles.item} key={uuidv1()}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <TouchableOpacity style={styles.linkButton} onPress={() => this.changePage(item.name)}>
                        <Text style={styles.linkText}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (
            <View style={(columnNum == 2) ? 
                styles.container : (
                    (columnNum != 0) ? styles.singleColumnContainer : styles.fanItemContainer
                )}>
                {items}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#1a3f95",
    },
    item: {
        flexDirection: 'row',
        paddingTop: height / 50,
        paddingLeft: height / 80
    },
    linkButton: {
        width: width / 6,
        height: width / 13,
        backgroundColor: '#a8a9ad',
        borderColor: '#1a3f95',
        borderWidth: 0.7,
        borderRadius: 13,
        alignItems: 'center'
    },
    linkText: {
        color: "#1a3f95",
        fontSize: width / 20
    },
    nameText: {
        color: 'white',
        fontSize: width / 20,
        paddingRight: width / 100
    },
    singleColumnContainer: {
        alignItems: 'flex-end',
        backgroundColor: "#1a3f95",
        paddingLeft: (width / 6 + height / 95)
    },
    fanItemContainer: {
        alignItems: 'flex-end',
        backgroundColor: "#1a3f95",
        paddingLeft: (width / 6 + height / 95)
    }
});