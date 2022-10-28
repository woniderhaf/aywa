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
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';

// components
import GoBack from '../../components/GoBack';
import {Utils} from '../../helpers/Index';

// styles
import styles from '../../styles/Styles';

// start
export default class RemindScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isblock: true,
      isEmail: false,
      loading: true,
    };
  }

  componentDidMount = async () => {};

  goto = link =>
    this.props.navigation.navigate(link, {email: this.state.email});

  changeEmail = email => {
    this.setState({email});
    if (Utils.emailCheck(email)) {
      this.setState({isEmail: true});
    }
  };

  render() {
    return (
      <View style={s.container}>
        <KeyboardAvoidingView
          behavior={Platform.select({android: undefined, ios: 'padding'})}
          enabled
          scrollEnabled={false}>
          <View style={s.block}>
            <GoBack
              navigation={this.props.navigation}
              color={styles.brownlight.color}
            />
            <ScrollView scrollEnabled={false}>
              <Text
                style={[
                  styles.text,
                  styles.title,
                  styles.white,
                  styles.center,
                  styles.mt30,
                  styles.mb10,
                ]}>
                Восстановление{'\r\n'}пароля
              </Text>
              <View style={styles.form}>
                <View style={[styles.row, styles.rowlast]}>
                  <Text style={[styles.text, styles.boldlight, styles.brown]}>
                    E-mail
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.email}
                    onChangeText={this.changeEmail}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'• • • • • •'}
                    keyboardType={'email-address'}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={[styles.buttonsblock, s.buttonsblock]}>
          {!Utils.emailCheck(this.state.email) ? (
            <View style={[styles.button, styles.buttondisable]}>
              <Text style={[styles.text, styles.bold, styles.grey]}>
                Отправить код
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.goto('RemindCode')}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Отправить код
              </Text>
            </TouchableOpacity>
          )}
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
    paddingTop: marginTop ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    backgroundColor: styles.blacklight.color,
  },
  buttonsblock: {
    marginBottom: marginTop ? 50 : 30,
  },
});
