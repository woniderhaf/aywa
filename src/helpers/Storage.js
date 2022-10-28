/*
 * (c) pavit.design, 2022
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const get = async key => {
  let value = null;
  try {
    value = (await AsyncStorage.getItem(key)) || null;
  } catch (error) {
    console.log(error.message);
  }
  return value;
};

const set = (key, value) => {
  try {
    if (typeof value === 'object') value = JSON.stringify(value);
    AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error.message);
  }
};

const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};

const clear = async () => await AsyncStorage.clear();

const removeItems = async keys => keys.forEach(v => remove(v));

const objectByKeys = (keys, callback) => {
  function keyGet(keys, index, obj, callback) {
    const k = keys[index];
    if (k === undefined) {
      if (callback) callback(obj);
      return;
    }
    get(k, v => {
      if (v) obj[k] = v;
      index++;
      keyGet(keys, index, obj, callback);
    });
  }
  keyGet(keys, 0, {}, callback);
};

export {get, set, remove, clear, removeItems, objectByKeys};
