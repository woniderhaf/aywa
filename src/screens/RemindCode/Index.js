/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
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
export default class RemindCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email'),
      code: null,
      isblock: true,
      loading: true,
    };
  }

  componentDidMount = async () => {};

  goto = link =>
    this.props.navigation.navigate(link, {
      email: this.state.email,
      code: this.state.code,
    });

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
                    Введите код
                  </Text>
                  <TextInput
                    style={[styles.text, styles.boldmore, styles.input]}
                    value={this.state.code}
                    onChangeText={code => this.setState({code})}
                    maxLength={6}
                    autoCorrect={false}
                    placeholder={'• • • • • •'}
                    keyboardType={'number-pad'}
                    placeholderTextColor={styles.brown.color}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={[styles.buttonsblock, s.buttonsblock]}>
          {this.state.code?.length !== 6 ? (
            <View style={[styles.button, styles.buttondisable]}>
              <Text style={[styles.text, styles.bold, styles.grey]}>Далее</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.goto('RemindPassword')}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Далее
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
