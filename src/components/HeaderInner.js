import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
// components
import GoBack from './GoBack';

export default Header = props => {
  const {
    navigation,
    title,
    smallTitle,
    context,
    link,
    styles,
    isinnerHeight,
    bg,
  } = props;
  return (
    <View style={[styles.headerinner, bg]}>
      <View style={styles.headerLeft}>
        {navigation ? (
          <GoBack
            navigation={navigation}
            link={link}
            isinnerHeight={isinnerHeight}
          />
        ) : null}
      </View>
      {smallTitle ? (
        <View>
          <Text
            style={[
              styles.text,
              styles.textlarge,
              styles.bold,
              styles.center,
              styles.brownlight,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
          <Text
            style={[
              styles.small,
              styles.ml15,
              styles.center,
              styles.brownlight,
            ]}
            numberOfLines={1}>
            {smallTitle}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.text,
            styles.textlarge,
            styles.bold,
            styles.center,
            styles.brownlight,
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      )}
      <View style={styles.headerRight}>{context}</View>
    </View>
  );
};
