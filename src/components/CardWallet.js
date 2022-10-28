import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from '../styles/Styles';
const image = {
  GEM: require('../screens/Wallet/Images/GEM.png'),
  AW: require('../screens/Wallet/Images/AW.png'),
  SOL: require('../screens/Wallet/Images/SOL.png'),
};
const icons = {
  qr: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_174610)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 9H4C3.448 9 3 8.552 3 8V4C3 3.448 3.448 3 4 3H8C8.552 3 9 3.448 9 4V8C9 8.552 8.552 9 8 9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 21H4C3.448 21 3 20.552 3 20V16C3 15.448 3.448 15 4 15H8C8.552 15 9 15.448 9 16V20C9 20.552 8.552 21 8 21Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20 9H16C15.448 9 15 8.552 15 8V4C15 3.448 15.448 3 16 3H20C20.552 3 21 3.448 21 4V8C21 8.552 20.552 9 20 9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 12H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5V3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 12H13C12.448 12 12 11.552 12 11V9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12H3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 18H13C12.448 18 12 18.448 12 19V21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15H18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 15V20C21 20.552 20.552 21 20 21H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.00012 5.99023C5.99712 5.99023 5.99512 5.99223 5.99512 5.99523C5.99512 5.99823 5.99712 6.00023 6.00012 6.00023C6.00312 6.00023 6.00512 5.99823 6.00512 5.99523C6.00512 5.99223 6.00312 5.99023 6.00012 5.99023Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9952 5.99512C17.9922 5.99512 17.9902 5.99712 17.9902 6.00012C17.9902 6.00312 17.9922 6.00512 17.9952 6.00512C17.9982 6.00512 18.0002 6.00312 18.0002 6.00012C18.0002 5.99712 17.9982 5.99512 17.9952 5.99512Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.9952 11.9951C18.9922 11.9951 18.9902 11.9971 18.9902 12.0001C18.9902 12.0031 18.9922 12.0051 18.9952 12.0051C18.9982 12.0051 19.0002 12.0031 19.0002 12.0001C19.0002 11.9971 18.9982 11.9951 18.9952 11.9951Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9952 17.9951C17.9922 17.9951 17.9902 17.9971 17.9902 18.0001C17.9902 18.0031 17.9922 18.0051 17.9952 18.0051C17.9982 18.0051 18.0002 18.0031 18.0002 18.0001C18.0002 17.9971 17.9982 17.9951 17.9952 17.9951Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.005 17.9951C6.002 17.9951 6 17.9971 6 18.0001C6 18.0031 6.002 18.0051 6.005 18.0051C6.008 18.0051 6.01 18.0031 6.01 18.0001C6.01 17.9971 6.008 17.9951 6.005 17.9951Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_174610"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  copy: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_175278)"><path d="M15.833 5.8335H7.49967C6.5792 5.8335 5.83301 6.57969 5.83301 7.50016V15.8335C5.83301 16.754 6.5792 17.5002 7.49967 17.5002H15.833C16.7535 17.5002 17.4997 16.754 17.4997 15.8335V7.50016C17.4997 6.57969 16.7535 5.8335 15.833 5.8335Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83333 14.1667H4.16667C3.72464 14.1667 3.30072 13.9911 2.98816 13.6785C2.67559 13.366 2.5 12.942 2.5 12.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.5C12.942 2.5 13.366 2.67559 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667V5.83333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_175278"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`,
};

export default CardWallet = props => {
  const {type, value, number, end} = props;

  return (
    <View style={[s.container, {marginRight: end ? -2 : 4}]}>
      <ImageBackground
        style={[s.bg]}
        source={
          type === 'AW' ? image.AW : type === 'GEM' ? image.GEM : image.SOL
        }>
        <View style={styles.spaceBetween}>
          <View>
            <Text style={s.small}>
              Мой <Text style={s.type}>{type}</Text> кошелек
            </Text>
            <Text style={s.value}>
              {value}{' '}
              <Text style={[s.value, {color: 'rgba(255,255,255,0.4)'}]}>
                {type}
              </Text>
            </Text>
          </View>
          <View style={[styles.center, s.qr]}>
            <SvgXml xml={icons.qr} />
          </View>
        </View>
        {type !== 'GEM' && (
          <View>
            <Text style={s.small}>Номер кошелька</Text>
            <View style={[styles.center, {justifyContent: 'flex-start'}]}>
              <Text style={s.number}>{number}</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(number)}>
                <SvgXml xml={icons.copy} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const radius = 36;
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: radius,
    height: 240,
    width: width - 2,
  },
  bg: {
    height: 240,
    width: width - 2,
    overflow: 'hidden',
    alignSelf: 'center',
    padding: 24,
    justifyContent: 'space-between',
  },
  qr: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  small: {
    ...styles.white,
    opacity: 0.4,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
  },
  type: {
    fontWeight: '700',
    fontSize: 14,
  },
  value: {
    fontSize: 36,
    fontWeight: '400',
    ...styles.white,
    lineHeight: 43,
  },
  number: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    marginRight: 8,
  },
});
