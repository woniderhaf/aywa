import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Template from '../../components/Template';
import {App} from '../../helpers/Index';
import styles from '../../styles/Styles';
const icons = {
  arrowR: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13064)"><path d="M10 16L14 12L10 8" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13064"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
};
export default Safety = props => {
  const [loading, setLoading] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isFaceID, setIsFaceID] = useState(false);
  const [isPhone, setIsPhone] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  useEffect(() => {
    App.prepare(props.navigation, async user => {
      setLoading(false);
    });
  });
  const goto = (link, data) => props.navigation.navigate(link, data);
  return (
    <Template
      title="Безопасность"
      isinner={true}
      isheader={true}
      styles={styles}
      navigation={props.navigation}
      loading={loading}>
      {loading ? null : (
        <>
          <View style={s.wrapper}>
            <View style={[styles.spaceBetween, {paddingBottom: 16}]}>
              <Text style={s.text}>ПИН-код при входе</Text>
              <TouchableOpacity onPress={() => goto('PINcode')}>
                <SvgXml xml={icons.arrowR} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.hr,
                {borderBottomColor: 'rgba(255,255,255,0.05)'},
              ]}></View>
            <View style={[styles.spaceBetween, {paddingVertical: 16}]}>
              <Text style={s.text}>Вход по паролю</Text>
              <TouchableOpacity
                onPress={() => setIsPassword(data => !data)}
                style={[
                  s.switchBlock,
                  isPassword
                    ? {backgroundColor: '#A03BEF', justifyContent: 'flex-end'}
                    : {justifyContent: 'flex-start'},
                ]}>
                <View style={s.circle}></View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.hr,
                {borderBottomColor: 'rgba(255,255,255,0.05)'},
              ]}></View>
            <View style={[styles.spaceBetween, {paddingVertical: 16}]}>
              <Text style={s.text}>Face ID</Text>
              <TouchableOpacity
                onPress={() => setIsFaceID(data => !data)}
                style={[
                  s.switchBlock,
                  isFaceID
                    ? {backgroundColor: '#A03BEF', justifyContent: 'flex-end'}
                    : {justifyContent: 'flex-start'},
                ]}>
                <View style={s.circle}></View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={s.title}>двухконтактная аунтификация</Text>
          <View style={s.wrapper}>
            <View style={[styles.spaceBetween, {paddingBottom: 16}]}>
              <View>
                <Text style={s.text}>Номеру телефона</Text>
                <TouchableOpacity>
                  <Text style={s.changeText}>Изменить</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setIsPhone(data => !data)}
                style={[
                  s.switchBlock,
                  isPhone
                    ? {backgroundColor: '#A03BEF', justifyContent: 'flex-end'}
                    : {justifyContent: 'flex-start'},
                ]}>
                <View style={s.circle}></View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.hr,
                {borderBottomColor: 'rgba(255,255,255,0.05)'},
              ]}></View>
            <View style={[styles.spaceBetween, {paddingTop: 16}]}>
              <View>
                <Text style={s.text}>E-mail</Text>
                <TouchableOpacity>
                  <Text style={s.changeText}>Изменить</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setIsEmail(data => !data)}
                style={[
                  s.switchBlock,
                  isEmail
                    ? {backgroundColor: '#A03BEF', justifyContent: 'flex-end'}
                    : {justifyContent: 'flex-start'},
                ]}>
                <View style={s.circle}></View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Template>
  );
};

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: '#242424',
    borderRadius: 36,
    padding: 32,
  },
  text: {
    ...styles.white,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
  },
  switchBlock: {
    padding: 4,
    height: 24,
    width: 48,
    borderRadius: 8,
    backgroundColor: '#5B5B5B',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  title: {
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 24,
    marginBottom: 8,
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  changeText: {
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    paddingTop: 7,
  },
});
