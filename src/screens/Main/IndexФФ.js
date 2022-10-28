/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  PermissionsAndroid,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './Page';
const WORDS = ["Whats'up", 'up', 'mobile', 'devs?'];
// start

export default MainScreen = () => {
  const translateX = useSharedValue(0);

  const scrollAnimated = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollAnimated}
      horizontal={true}
      style={s.container}>
      {WORDS.map((title, index) => (
        <Page
          key={index.toString()}
          title={title}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
