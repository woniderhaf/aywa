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
import {Http, Utils, Storage} from '../../helpers/Index';

// styles
import styles from '../../styles/Styles';

// icons
const icons = {
  check: {
    on: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#A03BEF"/><path d="M8.44397 12.339L10.611 14.506L10.597 14.492L15.486 9.60303" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    off: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#5B5B5B"/></svg>',
  },
};

// start
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      code: null,
      type: null,
      duration: null,
      step: 1,
      isemailset: false,
      iscodeset: false,
      loading: true,
      firstName: null,
      lastName: null,
      password: null,
      repeatpassword: null,
      ispassword: null,
      isrepeatpassword: null,
      nickname: null,
      isfirstname: null,
      islastname: null,
    };
  }
  scroll = null;
  panel = null;
  toast = null;
  componentDidMount = async () => {};

  goto = link => this.props.navigation.navigate(link);
  checkemail = async () => {
    if (Utils.emailCheck(this.state.email)) {
      const {code} = await Http.post('user/register/prepare', {
        email: this.state.email,
      });
      if (code == 0) {
        this.setState({isemailset: true});
      } else if (code == 409) {
        // Toaster.show('Email занят', this.toast, styles, () => {});
      }
    }
  };

  checkcode = () => {
    const {code} = this.state;
    const iscodeset = code && code.length === 6;
    this.setState({iscodeset}, () => {
      if (iscodeset) {
        this.setState({step: 2});
        this.scrolldown();
      }
    });
  };
  checkpassword = () => {
    const {password} = this.state;
    const ispassword = password && password.length > 3;
    this.setState({ispassword}, () => {
      if (ispassword) {
        this.scrolldown();
      }
    });
  };
  checkrepeatpassword = () => {
    const {password, repeatpassword} = this.state;
    const isrepeatpassword = password === repeatpassword;
    this.setState({isrepeatpassword}, () => {
      if (isrepeatpassword) {
        this.setState({step: 3});
        this.scrolldown();
      }
    });
  };
  checkFirstName = () => {
    const {firstName} = this.state;
    const isfirstname = firstName && firstName.length > 2;
    this.setState({isfirstname}, () => {
      if (isfirstname) this.scrolldown();
    });
  };
  checkLastName = () => {
    const {lastName} = this.state;
    const islastname = lastName && lastName.length > 2;
    this.setState({islastname}, () => {
      if (islastname) {
        this.setState({step: 4});
        this.scrolldown();
      }
    });
  };
  typeset = type => this.setState({type}, this.scrolldown);
  durationset = duration => this.setState({duration}, this.scrolldown);

  scrolldown = () => {
    setTimeout(() => {
      try {
        this.scroll.scrollToEnd({animated: true});
      } catch (ex) {}
    }, 500);
  };

  register = async () => {
    const data = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
    };
    const req = await Http.post('user/register', data);
    console.log({req});
    if (req) {
      Storage.set('user', req);
      Storage.set('startScreen', 'Main');
    }
    this.panel.snapToIndex(0);
  };

  next = () => {
    this.panel.close();
    setTimeout(() => this.props.navigation.navigate('Main'), 500);
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.block}>
          <GoBack
            isinnerHeight={true}
            navigation={this.props.navigation}
            color={styles.brownlight.color}
          />
          <Text
            style={[
              styles.text,
              styles.title,
              styles.white,
              styles.center,
              styles.mt30,
            ]}>
            Создать аккаунт
          </Text>
        </View>
        <View style={s.blockbottom}>
          <View style={s.blockbottomheader}>
            <View style={s.step}>
              <Text
                style={[
                  styles.text,
                  styles.middle,
                  styles.boldmore,
                  styles.white,
                ]}>
                {this.state.step} <Text style={styles.normal}>/ 5</Text>
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                styles.middle,
                styles.boldlight,
                styles.grey,
                styles.upper,
              ]}>
              Анкетирование
            </Text>
          </View>
          <ScrollView
            ref={r => (this.scroll = r)}
            showsVerticalScrollIndicator={false}>
            <View style={s.message}>
              <Text
                style={[
                  styles.text,
                  styles.middle,
                  styles.boldlight,
                  styles.white,
                ]}>
                Добрый день! Давайте знакомиться.
              </Text>
            </View>
            <View style={s.message}>
              <Text
                style={[
                  styles.text,
                  styles.middle,
                  styles.boldlight,
                  styles.white,
                ]}>
                Укажите вашу почту
              </Text>
            </View>
            <View style={[s.message, s.messageright, s.oneline]}>
              <TextInput
                style={[styles.text, styles.boldmore, styles.input, s.input]}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                onBlur={() => this.checkemail()}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={'• • • • • •'}
                keyboardType={'email-address'}
                placeholderTextColor={styles.brown.color}
                underlineColorAndroid={'transparent'}
              />
              {this.state.isemailset ? (
                <SvgXml style={styles.ml5} xml={icons.check.on} />
              ) : null}
            </View>
            {this.state.isemailset ? (
              <>
                <View style={s.message}>
                  <Text
                    style={[
                      styles.text,
                      styles.middle,
                      styles.boldlight,
                      styles.white,
                    ]}>
                    На указанную электронную почту отправлен код
                  </Text>
                </View>
                <View style={[s.message, s.messageright, s.oneline]}>
                  <TextInput
                    style={[
                      styles.text,
                      styles.boldmore,
                      styles.input,
                      s.inputcode,
                    ]}
                    value={this.state.code}
                    onChangeText={code => this.setState({code})}
                    onBlur={() => this.checkcode()}
                    maxLength={6}
                    autoCorrect={false}
                    placeholder={'• • • • • •'}
                    keyboardType={'number-pad'}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                  {this.state.iscodeset ? (
                    <SvgXml style={styles.ml5} xml={icons.check.on} />
                  ) : null}
                </View>
                {/* password/ */}
                {this.state.iscodeset ? (
                  <>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Придумайте пароль
                      </Text>
                    </View>
                    <View style={[s.message, s.messageright, s.oneline]}>
                      <TextInput
                        style={[styles.text, styles.boldmore, styles.input]}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        onBlur={() => this.checkpassword()}
                        minLength={3}
                        autoCorrect={false}
                        placeholder={'• • • • • •'}
                        textContentType={'password'}
                        keyboardType={'default'}
                        placeholderTextColor={styles.brown.color}
                        underlineColorAndroid={'transparent'}
                      />
                      {this.state.isrepeatpassword ? (
                        <SvgXml style={styles.ml5} xml={icons.check.on} />
                      ) : null}
                    </View>
                  </>
                ) : null}
                {/* repeatpassword */}
                {this.state.ispassword ? (
                  <>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Повторите пароль
                      </Text>
                    </View>
                    <View style={[s.message, s.messageright, s.oneline]}>
                      <TextInput
                        style={[styles.text, styles.boldmore, styles.input]}
                        value={this.state.repeatpassword}
                        onChangeText={repeatpassword =>
                          this.setState({repeatpassword})
                        }
                        onBlur={() => this.checkrepeatpassword()}
                        minLength={3}
                        autoCorrect={false}
                        placeholder={'• • • • • •'}
                        textContentType={'password'}
                        keyboardType={'default'}
                        placeholderTextColor={styles.brown.color}
                        underlineColorAndroid={'transparent'}
                      />
                      {this.state.isrepeatpassword ? (
                        <SvgXml style={styles.ml5} xml={icons.check.on} />
                      ) : null}
                    </View>
                  </>
                ) : null}

                {/* firstname */}
                {this.state.isrepeatpassword ? (
                  <>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Укажите ваше имя
                      </Text>
                    </View>
                    <View style={[s.message, s.messageright, s.oneline]}>
                      <TextInput
                        style={[styles.text, styles.boldmore, styles.input]}
                        value={this.state.firstName}
                        onChangeText={firstName => this.setState({firstName})}
                        onBlur={() => this.checkFirstName()}
                        minLength={2}
                        autoCorrect={false}
                        placeholder={'• • • • • •'}
                        keyboardType={'default'}
                        placeholderTextColor={styles.brown.color}
                        underlineColorAndroid={'transparent'}
                      />
                      {this.state.isfirstname ? (
                        <SvgXml style={styles.ml5} xml={icons.check.on} />
                      ) : null}
                    </View>
                  </>
                ) : null}
                {/* lastName */}
                {this.state.isfirstname && (
                  <>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Укажите вашу фамилию
                      </Text>
                    </View>
                    <View style={[s.message, s.messageright, s.oneline]}>
                      <TextInput
                        style={[styles.text, styles.boldmore, styles.input]}
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({lastName})}
                        onBlur={() => this.checkLastName()}
                        minLength={2}
                        autoCorrect={false}
                        placeholder={'• • • • • •'}
                        keyboardType={'default'}
                        placeholderTextColor={styles.brown.color}
                        underlineColorAndroid={'transparent'}
                      />
                      {this.state.islastname ? (
                        <SvgXml style={styles.ml5} xml={icons.check.on} />
                      ) : null}
                    </View>
                  </>
                )}
                {this.state.islastname ? (
                  <>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Мы почти закончили!
                      </Text>
                    </View>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Ответьте на несколько вопросов
                      </Text>
                    </View>
                    <View style={s.message}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.boldlight,
                          styles.white,
                        ]}>
                        Как вам медитация?
                      </Text>
                    </View>
                    <View style={[s.message, s.messageright, s.messagelist]}>
                      <TouchableOpacity
                        style={[s.oneline, styles.mb10]}
                        onPress={() => this.typeset(1)}>
                        <SvgXml
                          style={styles.ml5}
                          xml={
                            this.state.type === 1
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.boldlight,
                            styles.white,
                            styles.ml5,
                          ]}>
                          Хочу попробовать
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[s.oneline, styles.mb10]}
                        onPress={() => this.typeset(2)}>
                        <SvgXml
                          style={styles.ml5}
                          xml={
                            this.state.type === 2
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.boldlight,
                            styles.white,
                            styles.ml5,
                          ]}>
                          Увлекаюсь уже давно
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={s.oneline}
                        onPress={() => this.typeset(3)}>
                        <SvgXml
                          style={styles.ml5}
                          xml={
                            this.state.type === 3
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.boldlight,
                            styles.white,
                            styles.ml5,
                          ]}>
                          Забавы ради
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.type ? (
                      <>
                        <View style={s.message}>
                          <Text
                            style={[
                              styles.text,
                              styles.middle,
                              styles.boldlight,
                              styles.white,
                            ]}>
                            Как давно вы увлекаетесь медитацией?
                          </Text>
                        </View>
                        <View
                          style={[s.message, s.messageright, s.messagelist]}>
                          <TouchableOpacity
                            style={[s.oneline, styles.mb10]}
                            onPress={() => this.durationset(1)}>
                            <SvgXml
                              style={styles.ml5}
                              xml={
                                this.state.duration === 1
                                  ? icons.check.on
                                  : icons.check.off
                              }
                            />
                            <Text
                              style={[
                                styles.text,
                                styles.middle,
                                styles.boldlight,
                                styles.white,
                                styles.ml5,
                              ]}>
                              Менее 1 года
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[s.oneline, styles.mb10]}
                            onPress={() => this.durationset(2)}>
                            <SvgXml
                              style={styles.ml5}
                              xml={
                                this.state.duration === 2
                                  ? icons.check.on
                                  : icons.check.off
                              }
                            />
                            <Text
                              style={[
                                styles.text,
                                styles.middle,
                                styles.boldlight,
                                styles.white,
                                styles.ml5,
                              ]}>
                              Более 1 года
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={s.oneline}
                            onPress={() => this.durationset(3)}>
                            <SvgXml
                              style={styles.ml5}
                              xml={
                                this.state.duration === 3
                                  ? icons.check.on
                                  : icons.check.off
                              }
                            />
                            <Text
                              style={[
                                styles.text,
                                styles.middle,
                                styles.boldlight,
                                styles.white,
                                styles.ml5,
                              ]}>
                              Более 3 лет
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {this.state.duration ? (
                          <TouchableOpacity
                            style={[styles.button, s.button]}
                            onPress={() => this.register()}>
                            <Text
                              style={[styles.text, styles.bold, styles.white]}>
                              Завершить регистрацию
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </ScrollView>
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
              Регистрация{'\r\n'}прошла успешно
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
        {/* <Toast
          ref={t => (this.toast = t)}
          style={styles.toastmessage}
          position={'top'}
          positionValue={0}
          fadeInDuration={2000}
        /> */}
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
  blockbottom: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    backgroundColor: styles.blacklight.color,
  },
  blockbottomheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  step: {
    width: 44,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: styles.violet.color,
  },
  message: {
    maxWidth: '70%',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 40,
    backgroundColor: styles.blacklight2.color,
  },
  messageright: {
    maxWidth: '100%',
    alignSelf: 'flex-end',
  },
  messagelist: {
    borderRadius: 20,
    paddingVertical: 20,
  },
  oneline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    minWidth: 70,
    maxWidth: '80%',
    height: 'auto',
  },
  inputcode: {
    width: 75,
    height: 'auto',
  },
  button: {
    marginTop: 40,
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
  buttonsblock: {
    marginBottom: marginTop ? 50 : 30,
  },
});
