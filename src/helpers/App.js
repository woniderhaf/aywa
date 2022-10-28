/*
 * (c) pavit.design, 2022
 */

// helpers
import {Storage} from './Index';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';
const prepare = async (navigation, callback) => {
  // changeNavigationBarColor('red');
  const u = await Storage.get('user');
  try {
    await callback(JSON.parse(u));
  } catch (ex) {
    console.log('error', ex);
    if (ex.status === 500) {
      navigation.navigate('NoInternet');
      return;
    }
    //Storage.set('startScreen', 'Start')
    //navigation.navigate('Start')
  }
};

export {prepare};
