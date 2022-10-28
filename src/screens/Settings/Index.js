import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Settings,
  StyleSheet,
  Dimensions,
} from 'react-native';
//plug-ins
import {SvgXml} from 'react-native-svg';
import {App} from '../../helpers/Index';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
//components
import Template from '../../components/Template';
//styles
import styles from '../../styles/Styles';
import {API} from '../../globals/Сonstants';
import {Storage} from '../../helpers/Index';
//constants
const icons = {
  protected: `<svg width="48" height="31" viewBox="0 0 48 31" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_179_10879)"><path opacity="0.5" d="M16 18V14C16 9.582 19.582 6 24 6C28.418 6 32 9.582 32 14V18" stroke="#00FE00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 42H14C11.79 42 10 40.21 10 38V22C10 19.79 11.79 18 14 18H34C36.21 18 38 19.79 38 22V38C38 40.21 36.21 42 34 42Z" fill="#00FE00"/></g><defs><clipPath id="clip0_179_10879"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>`,
  badProtected: `<svg width="48" height="31" viewBox="0 0 48 31" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_179_10894)"><path opacity="0.5" d="M16 15V14C16 9.582 19.582 6 24 6C28.418 6 32 9.582 32 14V18" stroke="#FB593B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 42H14C11.79 42 10 40.21 10 38V22C10 19.79 11.79 18 14 18H34C36.21 18 38 19.79 38 22V38C38 40.21 36.21 42 34 42Z" fill="#FB593B"/></g><defs><clipPath id="clip0_179_10894"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>`,
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13400)"><path d="M7.73304 20.829C7.48459 20.9587 7.20477 21.0162 6.92531 20.995C6.64585 20.9737 6.37793 20.8746 6.15192 20.7089C5.9259 20.5432 5.75085 20.3174 5.64659 20.0573C5.54233 19.7971 5.51304 19.513 5.56204 19.237L6.37104 14.6L2.96504 11.336C2.76101 11.1414 2.61595 10.8933 2.54649 10.6201C2.47702 10.3468 2.48597 10.0596 2.5723 9.79117C2.65863 9.52279 2.81885 9.28416 3.03459 9.10267C3.25032 8.92117 3.51284 8.80414 3.79204 8.76501L8.52104 8.08901L10.656 3.83001C10.7801 3.57961 10.9717 3.36886 11.2092 3.22151C11.4467 3.07417 11.7206 2.99609 12 2.99609C12.2795 2.99609 12.5534 3.07417 12.7909 3.22151C13.0284 3.36886 13.2199 3.57961 13.344 3.83001L15.479 8.08901L20.208 8.76501C20.4872 8.80414 20.7498 8.92117 20.9655 9.10267C21.1812 9.28416 21.3414 9.52279 21.4278 9.79117C21.5141 10.0596 21.5231 10.3468 21.4536 10.6201C21.3841 10.8933 21.2391 11.1414 21.035 11.336L17.629 14.6L18.438 19.238C18.487 19.514 18.4578 19.7981 18.3535 20.0583C18.2492 20.3184 18.0742 20.5442 17.8482 20.7099C17.6222 20.8756 17.3542 20.9747 17.0748 20.996C16.7953 21.0172 16.5155 20.9597 16.267 20.83L12 18.625L7.73304 20.829Z" fill="url(#paint0_linear_180_13400)"/></g><defs><linearGradient id="paint0_linear_180_13400" x1="-6.99955" y1="-40.514" x2="11.111" y2="32.6914" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_180_13400"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  shild: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13410)"><path d="M20 11.1824C20 15.7234 16.587 19.9694 12 21.0004C7.413 19.9694 4 15.7234 4 11.1824V7.23838C4 6.42638 4.491 5.69438 5.156 5.42338L10.156 3.37738C11.369 2.88038 12.631 2.88038 13.757 3.34138L18.757 5.38738C19.509 5.69538 20 6.42638 20 7.23838V11.1824Z" fill="url(#paint0_linear_180_13410)"/></g><defs><linearGradient id="paint0_linear_180_13410" x1="-4" y1="-40.5009" x2="17.0008" y2="31.0003" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_180_13410"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  file: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13422)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.75 3H7C6.20435 3 5.44129 3.31607 4.87868 3.87868C4.31607 4.44129 4 5.20435 4 6V18C4 18.7956 4.31607 19.5587 4.87868 20.1213C5.44129 20.6839 6.20435 21 7 21H17C17.7956 21 18.5587 20.6839 19.1213 20.1213C19.6839 19.5587 20 18.7956 20 18V9.25H16.5C15.7707 9.25 15.0712 8.96027 14.5555 8.44454C14.0397 7.92882 13.75 7.22935 13.75 6.5V3ZM19.9349 7.75C19.8155 7.18622 19.5351 6.66408 19.1213 6.25035L16.7496 3.87868C16.3359 3.46495 15.8138 3.18454 15.25 3.06511V6.5C15.25 6.83152 15.3817 7.14946 15.6161 7.38388C15.8505 7.6183 16.1685 7.75 16.5 7.75H19.9349Z" fill="url(#paint0_linear_180_13422)"/></g><defs><linearGradient id="paint0_linear_180_13422" x1="-4" y1="-40.5" x2="17" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_180_13422"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
};

//start
export default SettingsScreen = props => {
  const [loading, setLoading] = useState(true);
  const [isProtected, setIsProtected] = useState(false);
  const [isMeditation, setIsMeditation] = useState(true);
  const [isNewNFT, setIsNewNFT] = useState(true);
  const [isNews, setIsNews] = useState(true);
  const [languageActive, setLanguage] = useState('Русский');
  let notifications = null;
  let support = null;
  let language = null;
  const goto = (link, data) => props.navigation.navigate(link, data);
  useEffect(() => {
    App.prepare(props.navigation, async user => {
      let notifications = await Storage.get('notifications');
      if (notifications) {
        notifications = await JSON.parse(notifications);
        setIsNewNFT(notifications?.isNewNFT);
        setIsMeditation(notifications?.isMeditation);
        setIsNews(notifications?.isNews);
      }
      setLoading(false);
    });
  }, []);

  const changeLanguage = () => {
    language.close();
  };
  const updateNewNFT = () => {
    Storage.set('notifications', {isMeditation, isNews, isNewNFT: !isNewNFT});
    setIsNewNFT(data => !data);
  };
  const updateMeditation = () => {
    Storage.set('notifications', {
      isMeditation: !isMeditation,
      isNews,
      isNewNFT,
    });
    setIsMeditation(data => !data);
  };
  const updateNews = () => {
    Storage.set('notifications', {isMeditation, isNews: !isNews, isNewNFT});
    setIsNews(data => !data);
  };
  const animation = module =>
    useAnimatedStyle(() => {
      const translateX = interpolate(
        module,
        [false, true],
        [0, 23],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{translateX: withTiming(translateX, 320)}],
      };
    });
  return (
    <>
      <Template
        isheader={true}
        isinner={true}
        styles={styles}
        navigation={props.navigation}
        title="Настройки">
        <View style={s.container}>
          <TouchableOpacity
            style={[s.wrapper, styles.mr5]}
            onPress={() => notifications.snapToIndex(0)}>
            <Text style={s.title}>Уведомления</Text>
            <Text style={s.text}>Вы в курсе новостей</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.wrapper} onPress={() => goto('Safety')}>
            <Text style={s.title}>Безопасность</Text>
            {isProtected ? (
              <Text style={s.text}>Аккаунт защищен</Text>
            ) : (
              <Text style={s.text}>Аккаунт плохо защищен</Text>
            )}
            <SvgXml
              xml={isProtected ? icons.protected : icons.badProtected}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '36%',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.wrapper, styles.mr5]}
            onPress={() => language.snapToIndex(0)}>
            <Text style={s.title}>Язык системы</Text>
            <Text style={s.text}>Русский</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.wrapper, {paddingVertical: 58}]}
            onPress={() => support.snapToIndex(0)}>
            <Text style={s.title}>Поддержка</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.version}>
          Версия приложения <Text>{API.version}</Text>
        </Text>
      </Template>
      {/* notifications */}
      <BottomSheet
        ref={r => (notifications = r)}
        index={-1}
        snapPoints={[400]}
        handleComponent={null}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        // onChange={handleChange}
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
        <View style={styles.handleIndicatorStyle}></View>
        <View style={{backgroundColor: '#090909', flex: 1, borderRadius: 36}}>
          <Text style={s.Btitle}>Уведомления</Text>
          <View style={s.BWrapper}>
            <View style={s.rangeBlock}>
              <Text style={s.BWText}>Напоминание о медитации</Text>

              <TouchableOpacity
                onPress={updateMeditation}
                style={[
                  s.switchBlock,
                  isMeditation ? {backgroundColor: '#A03BEF'} : {},
                ]}>
                <Animated.View
                  style={[s.circle, animation(isMeditation)]}></Animated.View>
              </TouchableOpacity>
            </View>
            <View style={s.hr}></View>
            <View style={s.rangeBlock}>
              <Text style={s.BWText}>Новые NFT</Text>
              <TouchableOpacity
                onPress={updateNewNFT}
                style={[
                  s.switchBlock,
                  isNewNFT ? {backgroundColor: '#A03BEF'} : {},
                ]}>
                <Animated.View
                  style={[s.circle, animation(isNewNFT)]}></Animated.View>
              </TouchableOpacity>
            </View>
            <View style={s.hr}></View>
            <View style={s.rangeBlock}>
              <Text style={s.BWText}>Новости проекта</Text>
              <TouchableOpacity
                onPress={updateNews}
                style={[
                  s.switchBlock,
                  isNews ? {backgroundColor: '#A03BEF'} : {},
                ]}>
                <Animated.View
                  style={[s.circle, animation(isNews)]}></Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
      {/* support */}
      <BottomSheet
        ref={r => (support = r)}
        index={-1}
        snapPoints={[500]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        handleComponent={null}
        keyboardBehavior="interactive"
        // onChange={handleChange}
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
        <View style={styles.handleIndicatorStyle}></View>
        <View
          style={{
            backgroundColor: '#090909',
            flex: 1,
            borderRadius: 36,
          }}>
          <Text style={s.Btitle}>Поддержка</Text>
          <TouchableOpacity style={s.supportWrapperBlock}>
            <View style={styles.center}>
              <SvgXml xml={icons.star} style={s.svg} />
              <Text style={s.supportText}>Оценить приложение</Text>
            </View>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13404)"><path d="M17.3025 6.71094L6.70296 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82368 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13404"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.supportWrapperBlock}>
            <View style={styles.center}>
              <SvgXml xml={icons.shild} style={s.svg} />
              <Text style={s.supportText}>Конфиденциальность</Text>
            </View>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13404)"><path d="M17.3025 6.71094L6.70296 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82368 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13404"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.supportWrapperBlock}>
            <View style={styles.center}>
              <SvgXml xml={icons.file} style={s.svg} />
              <Text style={s.supportText}>Лицензионное соглашение</Text>
            </View>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13404)"><path d="M17.3025 6.71094L6.70296 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82368 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13404"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.supportWrapperBlock}>
            <View style={styles.center}>
              <SvgXml xml={icons.file} style={s.svg} />
              <Text style={s.supportText}>Условия использования</Text>
            </View>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_13404)"><path d="M17.3025 6.71094L6.70296 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82368 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_13404"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
            />
          </TouchableOpacity>
        </View>
      </BottomSheet>
      {/* language */}
      <BottomSheet
        ref={r => (language = r)}
        index={-1}
        snapPoints={[500]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
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
        <View style={styles.handleIndicatorStyle}></View>
        <View
          style={{
            backgroundColor: '#090909',
            flex: 1,
            borderRadius: 36,
          }}>
          <Text style={s.Btitle}>Язык системы</Text>
          <View style={s.BWrapper}>
            <TouchableOpacity
              onPress={() => setLanguage('Русский')}
              style={s.ratioBlock}>
              {languageActive === 'Русский' ? (
                <SvgXml
                  xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                  style={{marginRight: 8}}
                />
              ) : (
                <View style={[s.ratio]}></View>
              )}

              <Text style={s.BWText}>Русский</Text>
            </TouchableOpacity>
            <View style={s.hr}></View>
            <TouchableOpacity
              onPress={() => setLanguage('English')}
              style={s.ratioBlock}>
              {languageActive === 'English' ? (
                <SvgXml
                  xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                  style={{marginRight: 8}}
                />
              ) : (
                <View style={[s.ratio]}></View>
              )}
              <Text style={s.BWText}>English</Text>
            </TouchableOpacity>
            <View style={s.hr}></View>
            <TouchableOpacity
              onPress={() => setLanguage('Deutsch')}
              style={s.ratioBlock}>
              {languageActive === 'Deutsch' ? (
                <SvgXml
                  xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                  style={{marginRight: 8}}
                />
              ) : (
                <View style={[s.ratio]}></View>
              )}
              <Text style={s.BWText}>Deutsch</Text>
            </TouchableOpacity>
            <View style={s.hr}></View>
            <TouchableOpacity
              onPress={() => setLanguage('中文')}
              style={s.ratioBlock}>
              {languageActive === '中文' ? (
                <SvgXml
                  xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                  style={{marginRight: 8}}
                />
              ) : (
                <View style={[s.ratio]}></View>
              )}
              <Text style={s.BWText}>中文</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.languageBtn} onPress={changeLanguage}>
            <Text style={[s.languageText, {textAlign: 'center'}]}>
              Изменить язык
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#212121',
    borderRadius: 36,
    paddingVertical: 49,
    marginBottom: 4,
    width: width / 2 - 4,
  },
  title: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  text: {
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  //bottom sheet notifications
  Btitle: {
    ...styles.white,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    paddingVertical: 24,
    backgroundColor: '#242424',
    borderRadius: 36,
  },
  BWrapper: {
    paddingVertical: 40,
    paddingTop: 34,
    paddingHorizontal: 32,
    backgroundColor: '#242424',
    borderRadius: 36,
    marginTop: 4,
  },
  BWText: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 19,
  },
  rangeBlock: {
    paddingVertical: 16,
    ...styles.spaceBetween,
  },
  hr: {
    ...styles.hr,
    borderBottomColor: `rgba(255,255,255, 0.05)`,
  },
  version: {
    ...styles.white,
    opacity: 0.4,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  switchBlock: {
    padding: 4,
    height: 24,
    width: 48,
    borderRadius: 8,
    backgroundColor: '#5B5B5B',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  supportWrapperBlock: {
    ...styles.spaceBetween,
    padding: 32,
    backgroundColor: '#242424',
    borderRadius: 36,
    marginTop: 4,
  },
  svg: {
    marginRight: 8,
  },
  supportText: {
    ...styles.white,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
  },
  ratioBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  ratio: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#5B5B5B',
    marginRight: 8,
  },
  hr: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    // marginVertical: 16,
    width: width - 64 - 27,
    alignSelf: 'flex-end',
  },
  languageBtn: {
    backgroundColor: '#A03BEF',
    borderRadius: 30,
    paddingVertical: 19,
    width: width - 48,
    alignSelf: 'center',
    marginTop: 40,
  },
  languageText: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
  },
});
