import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {phoneFormatter} from '../helpers/Utils';
import styles from '../styles/Styles';
const returnPassword = () => {
  const res = ['', '', '', '', '', ''].map((v, i) => (
    <SvgXml
      key={i}
      xml={`<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="4" rx="2" fill="white"/></svg>`}
      style={{marginRight: 12}}
    />
  ));
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>{res}</View>
  );
};

export default InputData = ({title, data, type, end, panelShow}) => {
  const placeholder =
    type == 'nickname'
      ? data
        ? `@${data}`
        : null
      : type == 'phone'
      ? phoneFormatter(data)
      : type == 'password'
      ? returnPassword(data)
      : data;
  const modalTitle =
    type == 'firstName'
      ? 'имя'
      : type == 'lastName'
      ? 'фамилию'
      : type == 'phone'
      ? 'телефон'
      : type == 'nickname'
      ? 'никнейм'
      : type == 'password'
      ? 'пароль'
      : type == 'email'
      ? 'E-mail'
      : null;
  return (
    <>
      <View style={[s.data, end ? s.dataEnd : {}]}>
        <View>
          <Text style={s.title}>{title}</Text>
          <Text style={s.placeholder}>{placeholder}</Text>
        </View>
        <TouchableOpacity onPress={() => panelShow(modalTitle)}>
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99994 16L13.9999 12L9.99994 8" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  title: {
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  placeholder: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 24,
    maxWidth:'90%'
  },
  data: {
    ...styles.spaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dataEnd: {
    borderBottomWidth: 0,
    marginBottom: -20,
  },
});
