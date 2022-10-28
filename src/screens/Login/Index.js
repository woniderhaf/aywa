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
  Alert,
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';
import {User} from '../../models/Index';
import Toast from 'react-native-easy-toast';
// components
import GoBack from '../../components/GoBack';
import {Http, Screens, Storage, Utils, Toaster} from '../../helpers/Index';

// styles
import styles from '../../styles/Styles';

// icons
const icons = {
  eye: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.122 9.87999C15.293 11.051 15.293 12.952 14.122 14.125C12.951 15.296 11.05 15.296 9.87703 14.125C8.70603 12.954 8.70603 11.053 9.87703 9.87999C11.05 8.70699 12.95 8.70699 14.122 9.87999Z" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12C3 11.341 3.152 10.689 3.446 10.088C4.961 6.991 8.309 5 12 5C15.691 5 19.039 6.991 20.554 10.088C20.848 10.689 21 11.341 21 12C21 12.659 20.848 13.311 20.554 13.912C19.039 17.009 15.691 19 12 19C8.309 19 4.961 17.009 3.446 13.912C3.152 13.311 3 12.659 3 12Z" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  eyeclose:
    '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.5571 13.5571C14.3237 13.9505 14.0036 14.2854 13.621 14.5362C13.2385 14.787 12.8037 14.947 12.3498 15.004C11.896 15.0611 11.4351 15.0136 11.0024 14.8653C10.5696 14.717 10.1766 14.4718 9.85311 14.1484C9.52966 13.8249 9.28442 13.4318 9.13612 12.9991C8.98782 12.5664 8.94039 12.1055 8.99743 11.6517C9.05448 11.1978 9.21451 10.763 9.46529 10.3805C9.71607 9.9979 10.051 9.67773 10.4444 9.4444" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9941 16.9941C16.27 18.3018 14.1639 19.0066 12 19C10.2421 19.0313 8.51026 18.5717 6.99917 17.6729C5.48807 16.7741 4.25759 15.4717 3.44598 13.912C3.1526 13.3173 3 12.6631 3 12C3 11.3369 3.1526 10.6827 3.44598 10.088C4.27389 8.4393 5.59364 7.08861 7.2227 6.22272" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.4238 14.1336C20.4639 14.0576 20.5161 13.9894 20.554 13.912C20.8474 13.3173 21 12.6631 21 12C21 11.3369 20.8474 10.6827 20.554 10.088C19.7424 8.52832 18.5119 7.22589 17.0008 6.32708C15.4897 5.42827 13.7579 4.9687 12 5C11.7752 5 11.5567 5.03 11.3348 5.04462" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20L4 3" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

// start
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kirill@mail.ru',
      password: '1235',
      ispasswordshow: false,
      isblock: false,
      loading: true,
    };
    StatusBar.setBarStyle('light-content');
  }
  toast = null;
  componentDidMount = async () => {};

  goto = link => this.props.navigation.navigate(link);

  login = async () => {
    try {
      this.setState({isblock: true});

      const res = await User.login({
        email: this.state.email,
        password: this.state.password,
      });
      if (res.code) throw true;
      Storage.set('token', res.token);
      Storage.set('user', res.user);
      this.goto('Main');
      Storage.set('startScreen', 'Main');
    } catch (error) {
      Toaster.show('Неверны логин или пароль', this.toast, styles, () => {});
    } finally {
      this.setState({isblock: false});
    }
  };

  passwordShow = () =>
    this.setState({ispasswordshow: !this.state.ispasswordshow});

  render() {
    return (
      <View style={s.container}>
        <KeyboardAvoidingView
          behavior={Platform.select({android: undefined, ios: 'padding'})}
          enabled
          scrollEnabled={false}>
          <View style={s.block}>
            <GoBack
              isinnerHeight={true}
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
                Войдите{'\r\n'}в свой аккаунт
              </Text>
              <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.boldlight, styles.brown]}>
                    E-mail
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'• • • • • •'}
                    keyboardType={'email-address'}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
                <View style={[styles.row, styles.rowlast]}>
                  <Text style={[styles.text, styles.boldlight, styles.brown]}>
                    Пароль
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    autoCorrect={false}
                    placeholder={'• • • • • •'}
                    secureTextEntry={!this.state.ispasswordshow}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                  <TouchableOpacity
                    style={s.passwordshow}
                    onPress={() => this.passwordShow()}>
                    <SvgXml
                      xml={
                        this.state.ispasswordshow ? icons.eye : icons.eyeclose
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    styles.text,
                    styles.middle,
                    styles.boldlight,
                    styles.violetlight,
                  ]}
                  onPress={() => this.goto('Remind')}>
                  Напомнить свой пароль
                </Text>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={[styles.buttonsblock, s.buttonsblock]}>
          {Utils.empty(Utils.emailCheck(this.state.email)) ||
          Utils.empty(this.state.password) ? (
            <View style={[styles.button, styles.buttondisable]}>
              <Text style={[styles.text, styles.bold, styles.grey]}>Войти</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.login()}
              disabled={this.state.isblock}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Войти
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Toast
          ref={t => (this.toast = t)}
          style={[
            styles.toastmessage,
            {backgroundColor: 'red', width: '80%', alignItems: 'flex-end'},
          ]}
          position={'top'}
          positionValue={-13}
          fadeInDuration={3000}
        />
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
  passwordshow: {
    position: 'absolute',
    right: 20,
    top: 36,
  },
});
