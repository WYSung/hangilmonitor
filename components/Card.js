import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";

import PropTypes from "prop-types";

import Item from "./Item";

const { width, height } = Dimensions.get("window");

const BLOWER = require("../assets/blower.jpg");
const DRAIN = require("../assets/drain_pump.jpg");
const FAN = require("../assets/fan.jpg");
const FLOW = require("../assets/flow_pump.jpg");

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    itemType: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    goToLink: PropTypes.func.isRequired
  };

  render() {
    const type = this.props.itemType;
    const data = this.props.data;
    const goToLink = this.props.goToLink;

    let numOfItems = ((data.length % 2 === 0) ? data.length / 2 : (data.length / 2) + 1);
    let cardHeight = ((data.length < 3) ? height / 6 : (data.length < 5 ? height / 7 * numOfItems : height * numOfItems / 8));

    let img =
      type === "브로워"
        ? BLOWER
        : type === "배수펌프"
          ? DRAIN
          : type === "휀"
            ? FAN
            : FLOW;


    return (
      <View style={{
        backgroundColor: "#1a3f95",
        width: width,
        height: cardHeight,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
      }}>
        <View style={styles.imgContainer}>
          <Image source={img} style={styles.img} />
        </View>
        <Item
          itemList={data}
          columnNum={2}
          onPress={goToLink}
          type={type}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    paddingTop: 10,
    width: height / 8,
    height: height / 8
  },
  img: {
    width: height / 8,
    height: height / 8,
    borderRadius: height / 16,
  }
});
