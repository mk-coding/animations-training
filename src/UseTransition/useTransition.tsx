import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, bInterpolate } from "react-native-redash";

import { Card, Button, cards } from "../components";
import { CARD_WIDTH } from "../components/Card";

const { multiply, interpolate, not } = Animated;
const transformOrigin = -1 * (CARD_WIDTH / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  overlay: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const [toggled, setToggle] = useState<0 | 1>(0);
  const [alreadyToggled, setAlreadyToggled] = useState<boolean>(false);
  const transition = useTransition(toggled, not(toggled), toggled);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const direction = interpolate(index, {
          inputRange: [0, 1, 2],
          outputRange: [-1, 0, 1]
        });
        const rotate = !alreadyToggled
          ? 0
          : multiply(
              direction,
              interpolate(transition, {
                inputRange: [0, 1],
                outputRange: [0, Math.PI / 6]
              })
            );
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: [
                  { translateX: transformOrigin },
                  { rotate },
                  { translateX: -transformOrigin }
                ]
              }
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => {
          setToggle(toggled ^ 1);
          if (!alreadyToggled) setAlreadyToggled(true);
        }}
      />
    </View>
  );
};
