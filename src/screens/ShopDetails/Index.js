/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  PermissionsAndroid,
  Image,
  Platform,
  TextInput,
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/ru';

// components
import Template from '../../components/Template';

// models
import {User} from '../../models/Index';

// helpers
import {App, Http, Storage, Utils} from '../../helpers/Index';

// globals
import {API, MAPS} from '../../globals/Сonstants';

// styles
import styles from '../../styles/Styles';
import AccessItem from '../Shop/AccessItem';

// icons
const icons = {
  next: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M10 16L14 12L10 8" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

  coins:
    '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M11.6667 13.3333C9.08933 13.3333 7 11.244 7 8.66667C7 6.08933 9.08933 4 11.6667 4C14.2453 4 16.3333 6.08933 16.3333 8.66667C16.3333 11.244 14.2453 13.3333 11.6667 13.3333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.44 6.69141C4.97067 6.81141 3 8.83541 3 11.3341C3 13.9114 5.08933 16.0007 7.66667 16.0007C9.52933 16.0007 11.124 14.9021 11.8733 13.3234" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  placeholder:
    '<svg width="72" height="72" viewBox="0 0 72 72"><path d="M29.6367 42.363C30.6832 43.4098 31.9718 44.1824 33.3882 44.6122C34.8046 45.042 36.3052 45.1159 37.7569 44.8272C39.2087 44.5385 40.5669 43.8962 41.7111 42.9572C42.8553 42.0182 43.7503 40.8114 44.3167 39.4439C44.8831 38.0763 45.1034 36.5902 44.9582 35.1172C44.813 33.6441 44.3068 32.2296 43.4843 30.999C42.6618 29.7683 41.5484 28.7595 40.2429 28.062C38.9373 27.3645 37.4799 26.9997 35.9997 27" stroke="url(#paint0_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9083 16.908C12.4912 21.325 9.74238 27.1369 9.13007 33.3534C8.51776 39.5699 10.0799 45.8064 13.5503 51.0002C17.0206 56.1941 22.1846 60.024 28.1622 61.8373C34.1398 63.6507 40.5612 63.3352 46.3323 60.9448C52.1034 58.5544 56.8672 54.2369 59.8118 48.7279C62.7565 43.2189 63.6999 36.8593 62.4813 30.7328C61.2627 24.6062 57.9575 19.0917 53.1288 15.1289C48.3002 11.166 42.2469 9.00005 36.0003 9" stroke="url(#paint1_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 18C39.5601 18 43.0402 19.0557 46.0003 21.0335C48.9603 23.0114 51.2675 25.8226 52.6298 29.1117C53.9922 32.4008 54.3487 36.02 53.6541 39.5116C52.9596 43.0033 51.2453 46.2106 48.7279 48.7279C46.2106 51.2453 43.0033 52.9596 39.5116 53.6541C36.02 54.3487 32.4008 53.9922 29.1117 52.6298C25.8226 51.2675 23.0114 48.9603 21.0335 46.0003C19.0557 43.0402 18 39.5601 18 36" stroke="url(#paint2_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_263_8081" x1="21.9543" y1="-16.5" x2="43.6767" y2="54.5241" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_263_8081" x1="-18" y1="-121.5" x2="38.9491" y2="96.6357" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint2_linear_263_8081" x1="-4.25242e-06" y1="-69" x2="37.9661" y2="76.4238" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
  false: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#FB593B"/><path d="M11.66 6L6 11.66M11.66 11.66L6 6" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  true: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#00FE00"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
// vars
const dataAccessories = [
  {
    id: 14,
    name: 'Light Athletic',
    type: 'Common',
    price: 70,
    level: 55,
    number: 123123,
    img: '',
    category: 'accessories',
    img: require('../Shop/Images/mat1.png'),
  },
  {
    id: 15,
    name: 'Light Athletic',
    type: 'Common',
    price: 55,
    level: 55,
    number: 12351,
    img: '',
    category: 'accessories',
    img: require('../Shop/Images/mat2.png'),
  },
  {
    id: 16,
    name: 'Light Athletic',
    type: 'Common',
    price: 60,
    level: 55,
    number: 997231,
    img: '',
    category: 'accessories',
    img: require('../Shop/Images/mat3.png'),
  },
  {
    id: 17,
    name: 'Light Athletic',
    type: 'Common',
    price: 55,
    level: 55,
    number: 12351,
    img: '',
    category: 'accessories',
    img: require('../Shop/Images/mat4.png'),
  },
  {
    id: 18,
    name: 'Light Athletic',
    type: 'Common',
    price: 55,
    level: 55,
    number: 12351,
    img: '',
    category: 'accessories',
    img: require('../Shop/Images/mat1.png'),
  },
  {
    id: 19,
    name: 'Light Athletic',
    type: 'Common',
    price: 55,
    level: 55,
    number: 12351,
    img: '',
    category: 'accessories',
  },
  {
    id: 20,
    name: 'Light Athletic',
    type: 'Common',
    price: 55,
    level: 55,
    number: 12351,
    img: '',
    category: 'accessories',
  },
];
const skeletImage = require('../Shop/Images/mat4.png');

// start
export default class ShopDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // у пользователя будет телефон и почта и будет в инпуты брать оттуда значения
      data: this.props.navigation.getParam('data'),
      loading: true,
      dataAccessories,
      study: 1,
      iscodePhone: null,
      iscodeEmail: null,
      codePhone: null,
      codeEmail: null,
      phone: '',
      email: '',
    };
  }
  panel = null;
  study2 = null;
  study3 = null;
  componentDidMount = async () => {
    App.prepare(this.props.navigation, async user => {
      this.setState({
        user,
        phone: user.phone,
        email: user.email,
        loading: false,
      });
    });
  };
  goto = (link, data) => this.props.navigation.navigate(link, data);
  gotoPush = (link, data) => this.props.navigation.push(link, data);

  panelShow = () => this.panel.snapToIndex(0);
  panelHide = () => this.panel.close();
  study2Hide = () => this.study2.close();
  study3Hide = () => this.study3.close();
  study2Show = () => this.study2.snapToIndex(0);
  study3Show = () => this.study3.snapToIndex(0);
  next = study => {
    this.setState({study});
    if (study === 2) {
      this.panelHide();
      this.study2Show();
    } else if (study === 3) {
      this.study2Hide();
      this.study3Show();
    } else if (study == 4) {
      this.study3Hide();
    }
  };
  buy = async () => {
    if (this.state.codeEmail && this.state.codePhone) {
      const res = await Http.post('mat/buy', {
        id: this.state.user._id,
        data: this.state.data,
      });
      if (res) {
        this.setState({user: res});
        Storage.set('user', res);
        this.next(3);
      }
    } else {
      Alert.alert('укажите код');
    }
  };
  changeCodePhone = async codePhone => {
    this.setState({codePhone});
    if (codePhone.length === 4) {
      //запрос на сервер
      //если ответ ок то
      const {code} = await Http.post(`user/${this.state.phone}/check`, {
        code: codePhone,
      });
      if (code === 0) {
        this.setState({iscodePhone: true});
      } else {
        this.setState({iscodePhone: false});
      }
    } else {
      this.setState({iscodePhone: false});
    }
  };
  changeCodeEmail = async codeEmail => {
    this.setState({codeEmail});
    if (codeEmail.length === 4) {
      //запрос на сервер
      //если ответ ок то
      // const res = await Http.post(`user/${this.state.phone}/restore/check`, {
      //   code: this.state.codePhone,
      // });
      // console.log(res);
      this.setState({iscodeEmail: true});
    } else {
      this.setState({iscodeEmail: false});
    }
  };
  sendCodePhone = async () => {
    const res = await Http.post(`user/${this.state.phone}/restore`);
    console.log(res);
  };
  render() {
    const {data} = this.state;
    return (
      <>
        <Template
          title={this.state.title}
          styles={styles}
          navigation={this.props.navigation}
          isheader={true}
          isinner={true}
          loading={this.state.loading}
          headerContext={
            <View style={[s.tab, styles.center, {height: 40}]}>
              <Text style={[styles.white, styles.mr5, {paddingLeft: 5}]}>
                lvl
              </Text>
              <Text style={[styles.white]}>{data.level}</Text>
            </View>
          }>
          {this.state.loading ? null : (
            <View style={s.container}>
              <ScrollView contentContainerStyle={s.item}>
                <Image
                  source={this.state.data.image || skeletImage}
                  style={s.imgSkelet}
                />
                <Text style={[s.name]}>{data.name}</Text>
                <Text style={s.type}>{data.type}</Text>
                <TouchableOpacity
                  style={s.category}
                  onPress={() =>
                    this.goto('ShopCategories', {
                      data: [],
                      category: 'accessories',
                      title: 'Аксессуары',
                    })
                  }>
                  <Text
                    style={[
                      styles.text,
                      styles.middle,
                      styles.boldlight,
                      styles.brown,
                      styles.upper,
                    ]}>
                    Аксессуары
                  </Text>
                  <SvgXml xml={icons.next} />
                </TouchableOpacity>
                <View style={s.wrapperAccessories}>
                  {this.state.dataAccessories.slice(0, 4).map((v, i) => (
                    <AccessItem key={i} v={v} goto={this.gotoPush} />
                  ))}
                </View>
              </ScrollView>
              <View style={s.shopBottom}>
                <View style={{flex: 1}}>
                  <Text style={[styles.white, s.price]}>
                    {data.cost} <Text>AW</Text>
                  </Text>
                  <Text style={[s.balance]}>
                    Баланс: <Text>{this.state.user.balance}</Text> AW
                  </Text>
                </View>
                <TouchableOpacity
                  style={[s.tab, s.buttonBy]}
                  onPress={() => this.panelShow()}>
                  <Text style={[styles.text, {textAlign: 'center'}]}>
                    Купить
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Template>
        <BottomSheet
          ref={r => (this.panel = r)}
          index={-1}
          snapPoints={[this.state.user?.balance < data.price ? 360 : 323]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 36}}
          handleComponent={null}
          enablePanDownToClose={true}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          <>
            <Text style={s.textBy}>Купить</Text>
            <View style={s.blockBy}>
              <View style={s.rowSB}>
                <Text style={s.blockByText}>Баланс</Text>
                <Text style={[s.blockByText, styles.white]}>
                  AW {this.state.user?.balance}
                </Text>
              </View>
              <View style={s.hr}></View>
              <View style={s.rowSB}>
                <Text style={s.blockByText}>Стоимость</Text>
                <Text style={[s.blockByText, styles.white]}>
                  AW {data.cost}
                </Text>
              </View>
              {this.state.user?.balance < data.price ? (
                <>
                  <View style={s.hr}></View>
                  <View style={s.rowSB}>
                    <Text style={s.blockByText}>Недостаточно</Text>
                    <Text style={[s.blockByText, {color: '#FB593B'}]}>
                      AW {Number(data.cost) - this.state.user?.balance}
                    </Text>
                  </View>
                </>
              ) : null}
            </View>
            {this.state.user?.balance < data.cost ? (
              <TouchableOpacity style={[s.tab, s.next]}>
                <Text style={[styles.white, s.nextText]}>Пополнить</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[s.tab, s.next]}
                onPress={() => this.next(2)}>
                <Text style={[styles.white, s.nextText]}>Далее</Text>
              </TouchableOpacity>
            )}
          </>
        </BottomSheet>
        <BottomSheet
          ref={r => (this.study2 = r)}
          index={-1}
          snapPoints={[600]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 36}}
          handleComponent={null}
          onChange={e =>
            e === -1 ? this.setState({phone: '', email: '', code: null}) : {}
          }
          enablePanDownToClose={true}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          <>
            <Text style={s.textBy}>Проверочный код</Text>
            <View style={[s.blockBy, {marginBottom: 4}]}>
              <View style={s.rowSB}>
                <TextInput
                  style={[styles.text, styles.boldmore, s.input]}
                  defaultValue={this.state.data?.phone || null}
                  onChangeText={phone => this.setState({phone})}
                  autoCorrect={false}
                  maxLength={11}
                  placeholder={'Телефон'}
                  autoCapitalize={'none'}
                  keyboardType={'phone-pad'}
                  placeholderTextColor={styles.brown.color}
                  underlineColorAndroid={'transparent'}
                />
                {Utils.phoneClear(this.state.phone)?.length === 11 ? (
                  <TouchableOpacity
                    style={[s.blockByText]}
                    onPress={this.sendCodePhone}>
                    <Text style={[s.blockByText, styles.violet]}>
                      Отправить код
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={[s.blockByText, {opacity: 0.2}]}>
                    <Text style={[s.blockByText, styles.violet]}>
                      Отправить код
                    </Text>
                  </View>
                )}
              </View>
              <View style={s.hr}></View>
              <View style={s.rowSB}>
                {/* codePhone */}
                <TextInput
                  style={[styles.text, styles.boldmore, s.input, s.inputcode]}
                  value={this.state.codePhone}
                  onChangeText={this.changeCodePhone}
                  maxLength={4}
                  autoCorrect={false}
                  placeholder={'Код из телефона'}
                  keyboardType={'number-pad'}
                  placeholderTextColor={styles.brown.color}
                  underlineColorAndroid={'transparent'}
                />
                {this.state.iscodePhone !== null ? (
                  this.state.iscodePhone ? (
                    <SvgXml xml={icons.true} />
                  ) : (
                    <View style={styles.spaceBetween}>
                      <Text style={s.existNickname}>Неверный код</Text>
                      <SvgXml xml={icons.false} />
                    </View>
                  )
                ) : null}
              </View>
            </View>
            <View style={s.blockBy}>
              <View style={s.rowSB}>
                <TextInput
                  style={[styles.text, styles.boldmore, s.input]}
                  defaultValue={this.state.user?.email || null}
                  onChangeText={email => this.setState({email})}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  placeholder={'Email'}
                  keyboardType={'email-address'}
                  placeholderTextColor={styles.brown.color}
                  underlineColorAndroid={'transparent'}
                />
                {Utils.emailCheck(this.state.email) ? (
                  <TouchableOpacity style={[s.blockByText]}>
                    <Text style={[s.blockByText, styles.violet]}>
                      Отправить код
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[s.blockByText, {opacity: 0.2}]}>
                    <Text style={[s.blockByText, styles.violet]}>
                      Отправить код
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={s.hr}></View>
              <View style={s.rowSB}>
                <TextInput
                  style={[styles.text, styles.boldmore, s.input, s.inputcode]}
                  value={this.state.codeEmail}
                  onChangeText={this.changeCodeEmail}
                  maxLength={4}
                  autoCorrect={false}
                  placeholder={'Код из Email'}
                  keyboardType={'number-pad'}
                  placeholderTextColor={styles.brown.color}
                  underlineColorAndroid={'transparent'}
                />
                {this.state.iscodeEmail !== null ? (
                  this.state.iscodeEmail ? (
                    <SvgXml xml={icons.true} />
                  ) : (
                    <View style={styles.spaceBetween}>
                      <Text style={s.existNickname}>Неверный код</Text>
                      <SvgXml xml={icons.false} />
                    </View>
                  )
                ) : null}
              </View>
              {this.state.user?.balance < data.cost ? (
                <>
                  <View style={s.hr}></View>
                  <View style={s.rowSB}>
                    <Text style={s.blockByText}>Недостаточно</Text>
                    <Text style={[s.blockByText, {color: '#FB593B'}]}>
                      AW {Number(data.cost) - this.state.user?.balance}
                    </Text>
                  </View>
                </>
              ) : null}
            </View>
            {this.state.iscodeEmail && this.state.iscodePhone ? (
              <TouchableOpacity style={[s.tab, s.next]} onPress={this.buy}>
                <Text style={[styles.white, s.nextText]}>Купить</Text>
              </TouchableOpacity>
            ) : (
              <View style={[s.tab, s.next, {opacity: 0.2}]}>
                <Text style={[styles.white, s.nextText]}>Купить</Text>
              </View>
            )}
          </>
        </BottomSheet>
        <BottomSheet
          ref={r => (this.study3 = r)}
          index={-1}
          snapPoints={[480]}
          backgroundStyle={{
            backgroundColor: styles.blacklight.color,
            borderRadius: 36,
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
              Коврик{'\r\n'}успешно куплен
            </Text>
            <View style={[styles.buttonsblock, s.buttonsblock]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.next(4)}>
                <Text style={[styles.text, styles.bold, styles.white]}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </>
    );
  }
}

const marginTop = styles.pbx.paddingBottom ? 20 : 0;
const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styles.black.color,
  },
  item: {
    alignItems: 'center',
  },
  input: {
    ...styles.input,
    flex: 1,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: styles.violet.color,
  },
  shopBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E0E0F',
    padding: 16,
  },
  name: {
    ...styles.white,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  type: {
    ...styles.brownlight,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 60,
  },
  buttonBy: {
    flex: 1,
    paddingVertical: 19,
    borderRadius: 30,
  },
  textBy: {
    ...styles.white,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  blockBy: {
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 24,
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  blockByText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    ...styles.brownlight,
  },
  hr: {
    flexDirection: 'row',
    height: 2,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    marginVertical: 16,
  },
  rowSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 2,
  },
  balance: {
    color: '#5B5B5B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  imgSkelet: {
    width: 200,
    height: 240,
    borderRadius: 100,
    marginBottom: 24,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 15,
  },
  wrapperAccessories: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width,
  },
  existNickname: {
    ...styles.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    textAlign: 'center',
    borderRadius: 22,
    backgroundColor: '#313131',
    marginRight: 8,
  },
  indicator: {
    backgroundColor: '#242424',
    width: 32,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  next: {
    width: width - 48,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 19,
    borderRadius: 30,
  },
  nextText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
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
