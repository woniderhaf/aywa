import React from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';

// start
export default Loader = props => {
  const {styles} = props;
  return (
    <View style={styles.loaderContainer}>
      <StatusBar backgroundColor={'#090909'} />
      <ActivityIndicator color={styles.loaderText.color} />
      <Text style={styles.loaderText}>загрузка</Text>
    </View>
  );
};
