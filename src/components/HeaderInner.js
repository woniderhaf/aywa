import React from 'react';
import {View, Text} from 'react-native';

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
    bg,
    isinnerHeight,
  } = props;
  return (
    <View style={[styles.headerinner, bg]}>
      <View style={styles.headerLeft}>
        {navigation ? (
          <GoBack
            navigation={navigation}
            isinnerHeight={isinnerHeight}
            link={link}
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
      <View style={[styles.headerRight, context ? {} : {width: 60}]}>
        {context}
      </View>
    </View>
  );
};
