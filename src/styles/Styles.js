/*
 * (c) pavit.design, 2022
 */

import {
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  Appearance,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const ratio = width / 320;
const isX =
  Platform.OS === 'ios' &&
  (height === 812 ||
    width === 812 ||
    height === 896 ||
    width === 896 ||
    height === 844 ||
    width === 844 ||
    height === 926 ||
    width === 926);
const normalize = size =>
  Math.round(PixelRatio.roundToNearestPixel(size * ratio)) -
  (Platform.OS === 'ios' ? 0 : 2);
const notch = () => (isX ? 20 : 0);
const isDark = Appearance.getColorScheme() === 'dark';
const isAndroid = Platform.OS !== 'ios';

const colors = {
  black: '#090909',
  black2: '#1a1a1a',
  blacklight: '#242424',
  blacklight2: '#313131',
  white: '#fff',
  brown: '#5b5b5b',
  brownlight: '#858585',
  grey: '#aaa',
  light: '#f6f6f6',
  violet: '#a03bef',
  violetlight: '#ca86ff',
  red: '#c00',
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.black,
  },
  text: {
    fontSize: normalize(isAndroid ? 16 : 14),
    fontWeight: '300',
    color: colors.white,
  },
  textlarge: {
    fontSize: normalize(isAndroid ? 18 : 16),
  },
  title: {
    fontSize: normalize(isAndroid ? 26 : 24),
    fontWeight: '600',
    lineHeight: 34,
  },
  middle: {
    fontSize: normalize(isAndroid ? 14 : 12),
  },
  small: {
    fontSize: normalize(isAndroid ? 13 : 11),
  },
  mini: {
    fontSize: normalize(isAndroid ? 11 : 9),
    fontWeight: '300',
  },
  logo: {
    fontSize: normalize(isAndroid ? 66 : 64),
    fontWeight: '700',
  },
  tabs: {
    fontSize: normalize(isAndroid ? 11 : 9),
    fontWeight: '400',
  },
  bolder: {
    fontWeight: '900',
  },
  boldmore: {
    fontWeight: '700',
  },
  bold: {
    fontWeight: '500',
  },
  boldlight: {
    fontWeight: '400',
  },
  normal: {
    fontWeight: '300',
  },
  thin: {
    fontWeight: '100',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  upper: {
    textTransform: 'uppercase',
  },
  lower: {
    textTransform: 'lowercase',
  },
  italic: {
    fontStyle: 'italic',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  // colors
  white: {
    color: colors.white,
  },
  black: {
    color: colors.black,
  },
  black2: {
    color: colors.black2,
  },
  blacklight: {
    color: colors.blacklight,
  },
  blacklight2: {
    color: colors.blacklight2,
  },
  grey: {
    color: colors.grey,
  },
  light: {
    color: colors.light,
  },
  brown: {
    color: colors.brown,
  },
  brownlight: {
    color: colors.brownlight,
  },
  violet: {
    color: colors.violet,
  },
  violetlight: {
    color: colors.violetlight,
  },
  red: {
    color: colors.red,
  },
  // containers
  wrapper: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.black,
  },
  container: {
    width: width,
    backgroundColor: colors.black,
  },
  // container form
  containerform: {
    paddingHorizontal: 15,
    alignItems: 'flex-start',
  },
  // modal
  modalcontainer: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: notch() ? 35 : 10,
  },
  modalcontainerview: {
    paddingHorizontal: 20,
  },
  // header
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isAndroid ? 10 : 20 + notch(),
    padding: 15,
    paddingBottom: 20,
  },
  headerinner: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    // marginTop: isAndroid ? 10 : 40 + notch(),
    paddingTop: isAndroid ? 10 : 40 + notch(),
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerLeft: {
    width: 60,
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end',
  },
  // detect height
  pbx: {
    paddingBottom: notch(),
  },
  // margins
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },
  ml30: {
    marginLeft: 30,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr20: {
    marginRight: 20,
  },
  mr30: {
    marginRight: 30,
  },
  // loader
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  loaderText: {
    color: colors.white,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'uppercase',
    fontSize: normalize(9),
  },
  // form
  form: {
    width: '100%',
    marginHorizontal: 10,
    marginTop: 10,
  },
  row: {
    marginTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: colors.brown,
    borderBottomWidth: 1,
  },
  rowlast: {
    borderBottomWidth: 0,
  },
  input: {
    height: 56,
    alignItems: 'flex-start',
  },
  inputerror: {
    borderBottomColor: colors.red,
    borderBottomWidth: 1,
  },
  buttonsblock: {
    width: width - 40,
    marginHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: colors.violet,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonblack: {
    backgroundColor: colors.black,
  },
  buttongrey: {
    backgroundColor: colors.light,
  },
  buttondisable: {
    backgroundColor: colors.blacklight,
  },
  // toast
  toastmessage: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: notch() ? 60 : 40,
    backgroundColor: colors.input,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  toastmessagesuccess: {
    backgroundColor: '#60b769',
  },
  // others
  lastrow: {
    height: 20,
  },
  lastrowlarge: {
    height: 40,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  handleIndicatorStyle: {
    backgroundColor: 'rgba(255,255,255, 0.2)',
    width: 32,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  hr: {
    borderBottomColor: 'rgba(24, 24, 24, 0.7)',
    borderBottomWidth: 1,
    width: '100%',
  },
});

styles.inputStyle = [
  styles.text,
  styles.textlarge,
  styles.boldlight,
  styles.input,
];
styles.inputErrorStyle = [...styles.inputStyle, styles.inputerror];

export default styles;
