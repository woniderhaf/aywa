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
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

// components
import GoBack from '../../components/GoBack';
import {App, Utils} from '../../helpers/Index';

// styles
import styles from '../../styles/Styles';
import {User} from '../../models/Index';

// icons
const icons = {
  eye: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.122 9.87999C15.293 11.051 15.293 12.952 14.122 14.125C12.951 15.296 11.05 15.296 9.87703 14.125C8.70603 12.954 8.70603 11.053 9.87703 9.87999C11.05 8.70699 12.95 8.70699 14.122 9.87999Z" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12C3 11.341 3.152 10.689 3.446 10.088C4.961 6.991 8.309 5 12 5C15.691 5 19.039 6.991 20.554 10.088C20.848 10.689 21 11.341 21 12C21 12.659 20.848 13.311 20.554 13.912C19.039 17.009 15.691 19 12 19C8.309 19 4.961 17.009 3.446 13.912C3.152 13.311 3 12.659 3 12Z" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  eyeclose:
    '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.5571 13.5571C14.3237 13.9505 14.0036 14.2854 13.621 14.5362C13.2385 14.787 12.8037 14.947 12.3498 15.004C11.896 15.0611 11.4351 15.0136 11.0024 14.8653C10.5696 14.717 10.1766 14.4718 9.85311 14.1484C9.52966 13.8249 9.28442 13.4318 9.13612 12.9991C8.98782 12.5664 8.94039 12.1055 8.99743 11.6517C9.05448 11.1978 9.21451 10.763 9.46529 10.3805C9.71607 9.9979 10.051 9.67773 10.4444 9.4444" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9941 16.9941C16.27 18.3018 14.1639 19.0066 12 19C10.2421 19.0313 8.51026 18.5717 6.99917 17.6729C5.48807 16.7741 4.25759 15.4717 3.44598 13.912C3.1526 13.3173 3 12.6631 3 12C3 11.3369 3.1526 10.6827 3.44598 10.088C4.27389 8.4393 5.59364 7.08861 7.2227 6.22272" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.4238 14.1336C20.4639 14.0576 20.5161 13.9894 20.554 13.912C20.8474 13.3173 21 12.6631 21 12C21 11.3369 20.8474 10.6827 20.554 10.088C19.7424 8.52832 18.5119 7.22589 17.0008 6.32708C15.4897 5.42827 13.7579 4.9687 12 5C11.7752 5 11.5567 5.03 11.3348 5.04462" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20L4 3" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

// start
export default class RemindPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: null,
      password2: null,
      ispasswordshow1: false,
      ispasswordshow2: false,
      isblock: true,
      loading: true,
    };
  }

  panel = null;

  componentDidMount = async () => {};

  change = async () => {
    const res = await User.restore.finish(this.state.password1);
    this.panel.snapToIndex(0);
  };

  passwordShow1 = () =>
    this.setState({ispasswordshow1: !this.state.ispasswordshow1});
  passwordShow2 = () =>
    this.setState({ispasswordshow2: !this.state.ispasswordshow2});

  check = () => {
    const {password1, password2} = this.state;
    return (
      Utils.empty(password1) ||
      Utils.empty(password2) ||
      password1 !== password2
    );
  };

  next = () => {
    this.panel.close();
    setTimeout(() => this.props.navigation.navigate('Start'), 500);
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
                <View style={styles.row}>
                  <Text style={[styles.text, styles.boldlight, styles.brown]}>
                    Пароль
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.password1}
                    onChangeText={password1 => this.setState({password1})}
                    autoCorrect={false}
                    placeholder={'• • • • • •'}
                    secureTextEntry={!this.state.ispasswordshow1}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                  <TouchableOpacity
                    style={s.passwordshow}
                    onPress={() => this.passwordShow1()}>
                    <SvgXml
                      xml={
                        this.state.ispasswordshow1 ? icons.eye : icons.eyeclose
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, styles.rowlast]}>
                  <Text style={[styles.text, styles.boldlight, styles.brown]}>
                    Повторить пароль
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.password2}
                    onChangeText={password2 => this.setState({password2})}
                    autoCorrect={false}
                    placeholder={'• • • • • •'}
                    secureTextEntry={!this.state.ispasswordshow2}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                  <TouchableOpacity
                    style={s.passwordshow}
                    onPress={() => this.passwordShow2()}>
                    <SvgXml
                      xml={
                        this.state.ispasswordshow2 ? icons.eye : icons.eyeclose
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={[styles.buttonsblock, s.buttonsblock]}>
          {this.check() ? (
            <View style={[styles.button, styles.buttondisable]}>
              <Text style={[styles.text, styles.bold, styles.grey]}>
                Изменить пароль
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.change()}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Изменить пароль
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <BottomSheet
          ref={r => (this.panel = r)}
          index={-1}
          snapPoints={[420]}
          backgroundStyle={{
            backgroundColor: styles.blacklight.color,
            borderRadius: radius,
          }}
          handleComponent={null}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'none'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          <View style={s.panel}>
            <SvgXml
              style={s.check}
              xml={
                '<svg viewBox="0 0 219 184"><path fill-rule="evenodd" clip-rule="evenodd" d="M65.2943 180.898L65.2114 181L65.9633 181.61L66.0852 181.739L66.1028 181.723L68.3184 183.519L218.318 -1.48079L215.211 -4L67.8366 177.762L3.21138 109L0.296631 111.739L65.2943 180.898Z" fill="url(#paint0_linear_144_5054)"/><defs><linearGradient id="paint0_linear_144_5054" x1="262.584" y1="-96.8342" x2="31.9035" y2="184.436" gradientUnits="userSpaceOnUse"><stop stop-color="#A03BEF"/><stop offset="1" stop-color="#A03BEF" stop-opacity="0"/></linearGradient></defs></svg>'
              }
            />
            <Text
              style={[
                styles.text,
                styles.textlarge,
                styles.boldmore,
                styles.white,
                styles.center,
              ]}>
              Пароль{'\r\n'}успешно изменен
            </Text>
            <View style={[styles.buttonsblock, s.buttonsblock]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.next()}>
                <Text style={[styles.text, styles.bold, styles.white]}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
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
  panel: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  check: {
    width: 219,
    height: 184,
    marginLeft: 80,
  },
});
