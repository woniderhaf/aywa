import {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Vibration,
} from 'react-native';
//components
import Template from '../../components/Template';
//plug-ins
import {App} from '../../helpers/Index';
import {SvgXml} from 'react-native-svg';
//animations
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
//styles
import styles from '../../styles/Styles';

//constants
const USDT_TO_AW = 6.6956;
const icons = {
  usdt: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3473 13.4613L14.1323 15.8363C14.0844 15.8878 14.0264 15.929 13.9619 15.9572C13.8973 15.9854 13.8277 15.9999 13.7573 16H3.25735C3.20728 16 3.15829 15.9853 3.1164 15.9579C3.07451 15.9305 3.04153 15.8914 3.0215 15.8455C3.00146 15.7996 2.99525 15.7489 3.00362 15.6995C3.01199 15.6501 3.03457 15.6042 3.0686 15.5675L5.2811 13.1925C5.32901 13.1409 5.38702 13.0998 5.45154 13.0716C5.51606 13.0434 5.58569 13.0288 5.65609 13.0288H16.1561C16.2066 13.0277 16.2563 13.0416 16.2989 13.0688C16.3416 13.0959 16.3753 13.1351 16.3957 13.1813C16.4162 13.2276 16.4224 13.2788 16.4138 13.3286C16.4052 13.3784 16.3821 13.4246 16.3473 13.4613ZM14.1323 8.67753C14.0842 8.62618 14.0262 8.58518 13.9617 8.55702C13.8972 8.52887 13.8277 8.51416 13.7573 8.51379H3.25735C3.20728 8.51382 3.15829 8.52844 3.1164 8.55589C3.07451 8.58333 3.04153 8.62239 3.0215 8.66829C3.00146 8.71419 2.99525 8.76493 3.00362 8.8143C3.01199 8.86368 3.03457 8.90955 3.0686 8.94629L5.2811 11.3225C5.32918 11.3739 5.38725 11.4149 5.45172 11.443C5.51619 11.4712 5.58574 11.4859 5.65609 11.4863H16.1561C16.2061 11.486 16.2548 11.4712 16.2966 11.4437C16.3383 11.4161 16.3711 11.3771 16.3909 11.3312C16.4108 11.2854 16.4169 11.2347 16.4084 11.1854C16.4001 11.1362 16.3776 11.0904 16.3436 11.0538L14.1323 8.67753ZM3.25735 6.97129H13.7573C13.8277 6.97122 13.8973 6.95664 13.9619 6.92846C14.0264 6.9003 14.0844 6.85912 14.1323 6.80754L16.3473 4.43255C16.3821 4.39587 16.4052 4.34972 16.4138 4.29991C16.4224 4.2501 16.4162 4.19885 16.3957 4.15262C16.3753 4.10638 16.3416 4.06723 16.2989 4.04009C16.2563 4.01294 16.2066 3.99901 16.1561 4.00005H5.65609C5.58569 4.00013 5.51606 4.01471 5.45154 4.04288C5.38702 4.07105 5.32901 4.11222 5.2811 4.1638L3.0686 6.53879C3.03457 6.57553 3.01199 6.6214 3.00362 6.67078C2.99525 6.72015 3.00146 6.77089 3.0215 6.81679C3.04153 6.86269 3.07451 6.90175 3.1164 6.92919C3.15829 6.95664 3.20728 6.97126 3.25735 6.97129Z" fill="#5B5B5B"/></svg>`,
  exchange: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 8.6L15.4 5L11.8 8.6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.4004 19L15.4004 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.8 15.3999L7.4 18.9999L11 15.3999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.40039 5L7.40039 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  delete: `<svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0003 18H7.78325L2.21825 10L7.78325 2H24.0003V18ZM25.0003 0H7.26125C6.93425 0 6.62725 0.16 6.44025 0.429L0.17925 9.429C-0.05975 9.772 -0.05975 10.228 0.17925 10.571L6.44025 19.571C6.62725 19.84 6.93425 20 7.26125 20H25.0003C25.5523 20 26.0003 19.552 26.0003 19V1C26.0003 0.448 25.5523 0 25.0003 0ZM10.7932 13.957C10.9882 14.152 11.2443 14.25 11.5002 14.25C11.7562 14.25 12.0123 14.152 12.2073 13.957L14.7502 11.414L17.2932 13.957C17.4882 14.152 17.7442 14.25 18.0002 14.25C18.2563 14.25 18.5123 14.152 18.7073 13.957C19.0983 13.566 19.0983 12.934 18.7073 12.543L16.1642 10L18.7073 7.457C19.0983 7.066 19.0983 6.434 18.7073 6.043C18.3162 5.652 17.6842 5.652 17.2932 6.043L14.7502 8.586L12.2073 6.043C11.8163 5.652 11.1842 5.652 10.7932 6.043C10.4022 6.434 10.4022 7.066 10.7932 7.457L13.3363 10L10.7932 12.543C10.4022 12.934 10.4022 13.566 10.7932 13.957Z" fill="white"/></svg>`,
};

export default Exchange = props => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [exchangeTypeDIRECT, setExchengeType] = useState(true); // тип обмена- прямой(usdt-aw)
  const [gives, setGives] = useState(0); // отдаем
  const [receives, setReceives] = useState(
    gives
      ? exchangeTypeDIRECT
        ? gives * USDT_TO_AW
        : Math.floor((gives / USDT_TO_AW) * 100) / 100
      : 0,
  );
  const [ActiveExchange, setActiveExchange] = useState(false);
  const exchange = (currency, gives) => {
    if (currency === 'USDT') {
      return gives * USDT_TO_AW;
    }
  };
  useEffect(() => {
    App.prepare(props.navigation, async userStorage => {
      setUser({...userStorage, balance: {USDT: 20, AW: 434}});
      setLoading(false);
    });
  }, []);
  const handleExchange = () => {
    if (exchangeTypeDIRECT) {
      newGives = receives;
    }
    setExchengeType(type => !type);
  };
  const clickTouchNumber = number => {
    Vibration.vibrate(50);
    if (exchangeTypeDIRECT) {
      if (number === '.' && gives == 0) {
        setGives('0.');
      } else if (gives == '0') {
        setGives(number);
        setReceives(Math.floor(Number(number) * USDT_TO_AW * 100) / 100);
      } else {
        if (Number(gives + number) < 1000) {
          setReceives(
            Math.floor(Number(gives + number) * USDT_TO_AW * 100) / 100,
          );

          setGives(g => g + number);
        } else {
          setReceives(Math.floor(1000 * USDT_TO_AW * 100) / 100);
          setGives('1000');
        }
      }
    }
  };
  const deleteNumber = () => {
    Vibration.vibrate(50);
    if (gives === 0) {
      return null;
    }
    if (gives.length == 1) {
      setGives(0);
      setReceives(0);
    } else {
      setGives(type => type.slice(0, type.length - 1));
      setReceives(
        Math.floor(
          Number(gives.slice(0, gives.length - 1)) * USDT_TO_AW * 100,
        ) / 100,
      );
    }
  };
  //animations

  const animated = useAnimatedStyle(() => {
    const transform = interpolate(isActive, [false, true], [800, 380]);
    // const transform = interpolate(isActive, [false, true], [200, -200]);
    return {
      transform: [{translateY: withTiming(transform, 4000)}],
    };
  });
  const btnAnimated = useAnimatedStyle(() => {
    const color = interpolateColor(
      isActive,
      [false, true],
      ['#242424', '#A03BEF'],
    );
    const translateY = interpolate(isActive, [false, true], [200, -35]);
    return {
      transform: [{translateY: withTiming(translateY, 4000)}],
      backgroundColor: color,
      borderRadius: 30,
      paddingVertical: 19,
    };
  });
  const textAnimated = useAnimatedStyle(() => {
    const color = interpolateColor(
      isActive,
      [false, true],
      ['rgba(255,255,255,0.25)', 'rgba(255,255,255,1)'],
    );
    return {
      color,
      textAlign: 'center',
    };
  });

  //return
  return (
    <Template
      isheader={true}
      title={'Обменять'}
      isinner={true}
      isinnerHeight={true}
      styles={styles}
      navigation={props.navigation}
      loading={loading}
      bg={{backgroundColor: '#242424'}}>
      {loading ? null : (
        <View style={s.wrapper}>
          <StatusBar backgroundColor={'#242424'} />
          <TouchableOpacity
            activeOpacity={1}
            style={s.headerPath}
            onPress={() => setIsActive(true)}>
            <View>
              <Text style={s.currency}>
                {exchangeTypeDIRECT ? 'USDT' : 'AW'}
              </Text>
              <View style={s.balanceWrapper}>
                <Text style={s.balance}>BALANCE</Text>
                {exchangeTypeDIRECT ? (
                  <>
                    <SvgXml xml={icons.usdt} />
                    <Text style={s.balance}>{user.balance.USDT}</Text>
                  </>
                ) : (
                  <>
                    <Text style={[s.balance, {fontWeight: '700'}]}>
                      {' AW '}
                    </Text>
                    <Text style={s.balance}>{user.balance.AW}</Text>
                  </>
                )}
              </View>
            </View>
            {exchangeTypeDIRECT ? (
              <Text style={s.value}>{gives}</Text>
            ) : (
              <Text style={s.value}>{receives}</Text>
            )}
          </TouchableOpacity>
          <View style={s.centerPath}>
            <TouchableOpacity style={s.exchange} onPress={handleExchange}>
              <SvgXml xml={icons.exchange} />
            </TouchableOpacity>
            <View style={s.equally}>
              <SvgXml xml={icons.usdt} />
              <Text style={s.equallyText}>{`1 = AW ${USDT_TO_AW}`}</Text>
            </View>
          </View>
          <View style={s.footerPath}>
            <View>
              <Text style={s.currency}>
                {exchangeTypeDIRECT ? 'AW' : 'USDT'}
              </Text>
              <View style={s.balanceWrapper}>
                <Text style={s.balance}>BALANCE</Text>
                {!exchangeTypeDIRECT ? (
                  <>
                    <SvgXml xml={icons.usdt} />
                    <Text style={s.balance}>{user.balance.USDT}</Text>
                  </>
                ) : (
                  <>
                    <Text style={[s.balance, {fontWeight: '700'}]}>
                      {' AW '}
                    </Text>
                    <Text style={s.balance}>{user.balance.AW}</Text>
                  </>
                )}
              </View>
            </View>
            {exchangeTypeDIRECT ? (
              <Text style={s.value}>{receives}</Text>
            ) : (
              <Text style={s.value}>{gives}</Text>
            )}
          </View>
          <TouchableOpacity activeOpacity={0.6} style={[s.btnExchange]}>
            <Animated.View style={[s.btnExchange, btnAnimated]}>
              <Animated.Text style={[s.btnExchangeText, textAnimated]}>
                Обменять
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View style={[animated]}>
            <View style={s.touchBlock}>
              <View>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('1')}>
                  <Text style={s.touchText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('4')}>
                  <Text style={s.touchText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('7')}>
                  <Text style={s.touchText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('.')}>
                  <Text style={s.touchText}>.</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('2')}>
                  <Text style={s.touchText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('5')}>
                  <Text style={s.touchText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('8')}>
                  <Text style={s.touchText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('0')}>
                  <Text style={s.touchText}>0</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('3')}>
                  <Text style={s.touchText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('6')}>
                  <Text style={s.touchText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={() => clickTouchNumber('9')}>
                  <Text style={s.touchText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.touchNumberBlock}
                  onPress={deleteNumber}>
                  <SvgXml xml={icons.delete} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </Template>
  );
};
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  headerPath: {
    ...styles.spaceBetween,
    backgroundColor: '#242424',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width,
  },
  currency: {
    ...styles.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
  },
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  balance: {
    color: '#5B5B5B',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 32,
  },
  value: {
    color: '#5B5B5B',
    fontSize: 48,
    lineHeight: 57,
    fontWeight: '400',
  },
  centerPath: {
    marginVertical: 4,
    ...styles.spaceBetween,
    width,
    paddingHorizontal: 16,
  },
  exchange: {
    width: 70,
    height: '100%',
    ...styles.center,
    backgroundColor: '#242424',
    borderRadius: 36,
  },
  equally: {
    ...styles.center,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 29,
    marginLeft: 4,
    backgroundColor: '#151515',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  equallyText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 32,
    color: '#5B5B5B',
  },
  footerPath: {
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 38,
    paddingHorizontal: 24,
    width,
    ...styles.spaceBetween,
  },
  btnExchange: {
    width: 225,
    borderColor: '#080808',
    borderWidth: 2,
    marginBottom: 'auto',
  },
  btnExchangeText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
  },
  touchBlock: {
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    paddingVertical: 48,
    paddingHorizontal: 30,
    backgroundColor: '#242424',
    width,
    ...styles.spaceBetween,
    alignItems: 'flex-start',
    flex: 1,
  },
  touchNumberBlock: {
    width: 90,
    height: 56,
    ...styles.center,
  },
  touchText: {
    ...styles.white,
    fontSize: 20,
    lineHeight: 33,
    fontWeight: '400',
  },
});
