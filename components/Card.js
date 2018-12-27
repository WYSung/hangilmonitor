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

    let img =
      type === "브로워"
        ? BLOWER
        : type === "배수펌프"
          ? DRAIN
          : type === "휀"
            ? FAN
            : FLOW;

    const view =
      data != undefined ? (
        data.length > 2 ? (
          <View>
            {data.length != 3 ? (
              <View style={styles.items}>
                <Item
                  itemList={[data[0], data[1]]}
                  columnNum={2}
                  onPress={goToLink}
                  type={type}
                />
                <Item
                  itemList={[data[2], data[3]]}
                  columnNum={2}
                  onPress={goToLink}
                  type={type}
                />
              </View>
            ) : (
              <View style={styles.items}>
                <Item
                  itemList={[data[0], data[1]]}
                  columnNum={2}
                  onPress={goToLink}
                  type={type}
                />
                <Item
                  itemList={[data[2]]}
                  columnNum={2}
                  onPress={goToLink}
                  type={type}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.items}>
            <Item
              itemList={data}
              columnNum={type === "휀" ? 0 : 1}
              onPress={goToLink}
              type={type}
            />
          </View>
        )
      ) : (
        undefined
      );

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={img} style={styles.img} />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{type}</Text>
        </View>
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a3f95",
    width: width,
    height: height / 6,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imgContainer: {
    paddingTop: 10,
    width: height / 8,
    height: height / 8
  },
  img: {
    width: height / 8,
    height: height / 8,
    borderRadius: height / 16,
  },
  name: {
    backgroundColor: "#1a3f95",
    width: width / 4,
    height: height / 8,
    paddingLeft: 10,
    paddingTop: 15
  },
  nameText: {
    fontSize: width / 20,
    width: width / 4,
    color: "white"
  },
  items: {
    flexDirection: "row"
  }
});
