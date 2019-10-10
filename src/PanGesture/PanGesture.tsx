import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent } from "react-native-redash";
import { cards, StyleGuide, Card } from "../components";
import { CARD_WIDTH, CARD_HEIGHT } from "../components/Card";

const { Value, diffClamp, cond, set, eq, add } = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});
const [card] = cards;

export default () => {
  return (
    <View style={styles.container}>
      <View>
        <Card {...{ card }} />
      </View>
    </View>
  );
};
