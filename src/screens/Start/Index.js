/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
// plug-ins
import {SvgXml} from 'react-native-svg';

// styles
import styles from '../../styles/Styles';

// start
export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    StatusBar.setBarStyle('default');
  }
  componentDidMount = async () => {};

  goto = link => this.props.navigation.navigate(link);

  privacy = () => {};

  render() {
    return (
      <View style={s.container}>
        <View style={[s.block, s.blocktop]}>
          <Image source={require('./Images/logo.png')} style={s.logo} />
          <Text style={[styles.text, styles.logo, styles.black]}>AYWA</Text>
          <Text style={[styles.text, styles.textlarge, styles.grey]}>
            Медитация в твоем кармане
          </Text>
        </View>
        <View style={[s.block, s.blockbottom]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonblack, styles.mb15]}
            onPress={() => this.goto('Register')}>
            <Text style={[styles.text, styles.bold, styles.white]}>
              Создать аккаунт
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttongrey]}
            onPress={() => this.goto('Login')}>
            <Text style={[styles.text, styles.bold, styles.black]}>Войти</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              styles.middle,
              styles.boldlight,
              styles.grey,
              s.privacy,
            ]}
            onPress={() => this.privacy()}>
            Политика конфиденциальности
          </Text>
        </View>
      </View>
    );
  }
}

const marginTop = styles.pbx.paddingBottom ? 20 : 0;
const radius = 36;
const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  block: {
    alignItems: 'center',
    backgroundColor: styles.white.color,
    marginHorizontal: 2,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  blocktop: {
    height: marginTop ? '70%' : '65%',
    justifyContent: 'center',
    marginBottom: 3,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  },
  blockbottom: {
    height: marginTop ? '30%' : '35%',
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  logo: {
    width: marginTop ? 300 : 220,
    height: marginTop ? 300 : 220,
  },
  privacy: {
    position: 'absolute',
    bottom: marginTop ? 40 : 20,
  },
});
