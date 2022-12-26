import 'react-native-get-random-values';
// import {v4 as uuidv4} from 'uuid';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import {SvgXml} from 'react-native-svg';
import CardWallet from '../../components/CardWallet';
import Template from '../../components/Template';
import {App} from '../../helpers/Index';
import styles from '../../styles/Styles';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';

import Transaction from '../../components/Transaction';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import * as solanaWeb3 from '@solana/web3.js';
import {GetProgramAccountsConfig} from '@solana/web3.js';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
results = [
  {
    type: 'replenishment',
    date: new Date(1323333333333),
    value: 0.45,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
  {
    type: 'conclusion',
    date: new Date(1393933312333),
    value: 0.9,
  },
];

const endpoint =
  'https://quiet-dimensional-night.solana-mainnet.discover.quiknode.pro/4606b9a88143627ff0e89ee30f40420612e337e5/';

// const solanaConnection = new solanaweb3.Connection(endpoint);
// uuidv4();
//start
export default Wallet = props => {
  const solanaConnection = new solanaWeb3.Connection(endpoint);
  // const solanaConnection = new solanaWeb3.Connection(
  // solanaWeb3.clusterApiUrl('mainnet-beta'),
  // );
  const code = 'BjqM71VidJ7W1kjAQLSSd9Yw3wTb8GB7haScdju8JGAG';
  let qrCode = null;
  // const filter: GetProgramAccountsConfig[] = [
  //   {
  //     commitment: 'processed',
  //   },
  //   {
  //     dataSize: 165,
  //   },
  //   {
  //     memcmp: {
  //       offset: 32,
  //       bytes: code,
  //     },
  //   },
  // ];
  //useState
  const [loading, setLoading] = useState(true);
  // const [selectedPage, setSelectedPage] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [WLKNBalance, setWLKNBalance] = useState(null);
  const [SOLBalance, setSOLBalance] = useState(null);
  useEffect(() => {
    App.prepare(props.navigation, async user => {
      await getTransactions(code);
      setLoading(false);
    });
  }, []);

  // const current = useCallback(
  //   e => {
  //     console.log(e);
  //   },
  //   [selectedPage],
  // );
  const getTransactions = async (address, numTx) => {
    const pubKey = new solanaWeb3.PublicKey(address);
    const pubKeyWLKN = new solanaWeb3.PublicKey(
      'GY15u1tXfrAEGfVyu9CAAzuDziwQV9L2BA99Gm19QdBH',
    );
    let transactionList = await solanaConnection.getSignaturesForAddress(
      pubKey,
    );
    // const tokens = await solanaConnection.getTokenAccountsByOwner(pubKey);
    // console.log(tokens);
    const WLKN = await solanaConnection.getTokenAccountBalance(pubKeyWLKN);
    setWLKNBalance(WLKN.value.uiAmount);

    const SOL = await solanaConnection.getBalance(pubKey);
    setSOLBalance(SOL / solanaWeb3.LAMPORTS_PER_SOL);
    let signatureList = transactionList.map(
      transaction => transaction.signature,
    );

    let transactionDetails = await solanaConnection.getParsedTransactions(
      signatureList,
    );
    console.log(transactionDetails);
    setTransactions(transactionDetails);
  };

  const translateX = useSharedValue(0);

  const rStyle = index =>
    useAnimatedStyle(() => {
      const opacity = interpolate(
        translateX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.2, 1, 0.2],
        Extrapolate.CLAMP,
      );

      return {
        opacity,
      };
    });
  const onQrCode = () => {
    qrCode.snapToIndex(0);
  };
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [0, width],
      [-265, -140],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY}],
    };
  });
  const btnStyle = index =>
    useAnimatedStyle(() => {
      const translateY = interpolate(
        translateX.value,
        [width, 2 * width],
        [0, index * 133],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{translateY}],
      };
    });
  // const scrollAnimated = useAnimatedScrollHandler(event => {
  //   activeindex.value = event.contentOffset.x / width;
  //   translateX.value = event.contentOffset.x;
  // });
  const scrollAnimated = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <>
      <Template
        styles={styles}
        page={'Wallet'}
        loading={loading}
        bg={'#242424'}
        navigation={props.navigation}>
        <View style={{flex: 1}}>
          <ScrollView>
            <StatusBar backgroundColor={'#090909'} />
            <Animated.ScrollView
              onScroll={scrollAnimated}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={s.pageSlider}>
              {/* // selectedPage={selectedPage} */}
              {/* // onCurrentPageChange={current} */}
              <CardWallet type={'GEM'} value={20} />
              <CardWallet
                type={'AW'}
                value={WLKNBalance}
                address={code}
                onQrCode={onQrCode}
              />
              <CardWallet
                type={'SOL'}
                value={SOLBalance}
                address={code}
                onQrCode={onQrCode}
                end
              />
            </Animated.ScrollView>
            <View style={styles.center}>
              <Animated.View style={[s.indicator, rStyle(0)]}></Animated.View>
              <Animated.View style={[s.indicator, rStyle(1)]}></Animated.View>
              <Animated.View style={[s.indicator, rStyle(2)]}></Animated.View>
            </View>

            <Animated.View style={[s.step2, btnStyle(1), {zIndex: 50}]}>
              <TouchableOpacity
                style={s.wrapperBtn}
                onPress={() => qrCode.snapToIndex(0)}>
                <Text style={s.textBtn}>Получить</Text>
              </TouchableOpacity>
              <Animated.View style={[s.wrapperBtn]}>
                <Text style={s.textBtn}>Отправить</Text>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[s.step2, btnStyle(-1)]}>
              <TouchableOpacity
                style={s.wrapperBtn2}
                onPress={() => qrCode.snapToIndex(0)}>
                <Text style={s.textBtn}>Получить</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.wrapperBtn2}>
                <Text style={s.textBtn}>Отправить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.wrapperBtn2, s.pinkBg]}
                onPress={() => props.navigation.navigate('Exchange')}>
                <Text style={s.textBtn}>Обменять</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[s.transactionsWrapper, animatedStyle]}>
              <View style={s.header}>
                <Text style={s.upper}>Транзакции</Text>
                <TouchableOpacity>
                  <SvgXml
                    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13064)"><path d="M10 16L14 12L10 8" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13064"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
                  />
                </TouchableOpacity>
              </View>
              <View style={s.oparations}>
                {transactions?.map((v, i) => (
                  <Transaction key={i} data={v} />
                ))}
              </View>
            </Animated.View>
            <View style={styles.lastrowlarge}></View>
            <View style={styles.lastrowlarge}></View>
            <View style={styles.lastrowlarge}></View>
          </ScrollView>
        </View>
      </Template>
      <BottomSheet
        ref={r => (qrCode = r)}
        index={-1}
        snapPoints={[640]}
        backgroundStyle={{backgroundColor: 'transparent', borderRadius: 36}}
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
        <View style={s.indicatorBtn}></View>
        <View style={s.wrapper}>
          <View style={s.qrBlock}>
            {/* <Image source={require('./Images/qr.png')} /> */}
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 20}}>
              <QRCode value={code} size={220} />
            </View>
          </View>
          <View style={s.codeBlock}>
            <Text style={s.code}>{code}</Text>
            <TouchableOpacity onPress={() => Clipboard.setString(code)}>
              <SvgXml
                xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_175278)"><path d="M15.833 5.8335H7.49967C6.5792 5.8335 5.83301 6.57969 5.83301 7.50016V15.8335C5.83301 16.754 6.5792 17.5002 7.49967 17.5002H15.833C16.7535 17.5002 17.4997 16.754 17.4997 15.8335V7.50016C17.4997 6.57969 16.7535 5.8335 15.833 5.8335Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83333 14.1667H4.16667C3.72464 14.1667 3.30072 13.9911 2.98816 13.6785C2.67559 13.366 2.5 12.942 2.5 12.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.5C12.942 2.5 13.366 2.67559 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667V5.83333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_175278"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`}
              />
            </TouchableOpacity>
          </View>
          <Text style={s.text}>
            Отправляйте только токены{' '}
            <Text style={[s.code, styles.bold]}>AW</Text> на этот адрес.
            Отправка любых других токенов может привести к их безвозвратной
            потере
          </Text>
          <TouchableOpacity style={s.button}>
            <Text style={s.whiteText}>Продолжить</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  wrapper: {
    backgroundColor: '#090909',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingBottom: 30,
  },
  pageSlider: {
    marginVertical: 8,
    width: '100%',
  },
  page: {
    alignItems: 'center',
    height: 128,
    justifyContent: 'center',
    padding: 16,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
    backgroundColor: '#242424',
    backgroundColor: 'white',
  },
  indicatorAcrive: {
    backgroundColor: 'white',
  },
  transactionsWrapper: {
    backgroundColor: '#242424',
    borderRadius: 36,
    // paddingHorizontal: 24,
    // paddingVertical: 18,
    marginTop: 8,
    overflow: 'hidden',
    zIndex: 51,
  },
  header: {
    ...styles.spaceBetween,
    backgroundColor: '#212121',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  upper: {
    ...styles.upper,
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
  },
  oparations: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  step2: {
    ...styles.spaceBetween,
    marginBottom: 4,
    marginTop: 8,
  },
  wrapperBtn: {
    width: width / 2 - 4,
    paddingVertical: 51,
    borderRadius: 36,
    backgroundColor: '#242424',
  },
  wrapperBtn2: {
    width: width / 3 - 4,
    paddingVertical: 51,
    borderRadius: 36,
    backgroundColor: '#242424',
  },
  textBtn: {
    textAlign: 'center',
    ...styles.white,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
  },
  pinkBg: {
    backgroundColor: '#A03BEF',
  },
  qrBlock: {
    backgroundColor: '#242424',
    borderRadius: 36,
    padding: 50,
    ...styles.center,
  },
  codeBlock: {
    marginTop: 4,
    backgroundColor: '#242424',
    borderRadius: 36,
    padding: 24,
    ...styles.spaceBetween,
  },
  code: {
    maxWidth: 235,
    ...styles.white,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  text: {
    padding: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#A03BEF',
    borderRadius: 30,
    paddingVertical: 19,
    alignSelf: 'center',
    width: width - 48,
  },
  whiteText: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
  },
  indicatorBtn: {
    backgroundColor: 'white',
    opacity: 0.2,
    width: 32,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
