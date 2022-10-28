import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import * as ImagePicker from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import InputDate from '../../components/InputDate';
import Template from '../../components/Template';
import {User, Sms} from '../../models/Index';
import {App, Storage} from '../../helpers/Index';
import styles from '../../styles/Styles';
import {nicknamePrepare} from '../../models/User';

const userData = {
  image: require('../Profile/Images/avatar.png'),
};

//constants
const icons = {
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_15808)"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.331 20H9.66804C8.81687 19.9999 7.98073 19.7757 7.24366 19.3501C6.50658 18.9244 5.89453 18.3122 5.46904 17.575L3.65004 14.424C3.22405 13.6872 2.99976 12.8511 2.99976 12C2.99976 11.1489 3.22405 10.3128 3.65004 9.576L5.46904 6.424C5.89475 5.68686 6.507 5.07477 7.24426 4.64927C7.98152 4.22376 8.8178 3.99984 9.66904 4H14.331C15.1821 4.00021 16.0181 4.22431 16.7551 4.64978C17.4921 5.07526 18.1043 5.68714 18.53 6.424L20.35 9.575C20.776 10.3122 21.0003 11.1486 21.0003 12C21.0003 12.8514 20.776 13.6878 20.35 14.425L18.531 17.576C18.1053 18.3131 17.493 18.9251 16.7557 19.3506C16.0185 19.7761 15.1823 20.0001 14.331 20ZM15.47 11.9998C15.47 13.8599 13.9165 15.3678 12 15.3678C10.0836 15.3678 8.53003 13.8599 8.53003 11.9998C8.53003 10.1397 10.0836 8.63184 12 8.63184C13.9165 8.63184 15.47 10.1397 15.47 11.9998Z" fill="#A03BEF"/></g><defs><clipPath id="clip0_180_15808"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  noExistNickname: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#00FE00"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  existNickname: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#FB593B"/><path d="M11.66 6L6 11.66M11.66 11.66L6 6" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  `,
};
const options = {
  mediaType: 'photo',
  quality: 1,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  tintColor: '#4a86cc',
  permissionDenied: {
    title: 'Нет доступа к камере',
    text: 'Для того чтобы иметь возможность снимать фото или видео, перейдите в Настройки и разрешите доступ к камере',
    reTryTitle: 'Повторить',
    okTitle: 'ОК',
  },
  maxWidth: 1024,
  maxHeight: 1024,
  includeBase64: true,
};
//start
export default PersonalData = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);
  const [existNickname, setExistNickname] = useState(null);
  const [isSendCode, setIsSendCode] = useState(false);
  const [code, setCode] = useState('');
  const [isCheckCode, setCheckCode] = useState(null);
  const [isrepeatCode, setIsrepeatCode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isOldPassword, setIsOldPassword] = useState(null);
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [passwordMatched, setPasswordMatched] = useState(null);
  useEffect(() => {
    App.prepare(props.navigation, async userStorage => {
      setUser(userStorage);
      setUserUpdate(userStorage);
      setLoading(false);
    });
    return () => clearTimeout(timeOutRepeatCode());
  }, []);
  let firstName = null,
    lastName = null,
    email = null,
    phone = null,
    nickname = null,
    password = null,
    settings = null,
    input = null,
    changePhone = null,
    changePasswordBS = null;

  //permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  //

  const library = async () => {
    await requestCameraPermission();

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const base64 = response.assets[0].base64;
        saveImage(base64);

        settings?.close();
      }
    });
  };

  const camera = async () => {
    await requestCameraPermission();

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let uri = {uri: response.assets[0].uri};
        const base64 = response.assets[0].base64;
        saveImage(base64);
        settings?.close();
      }
    });
  };
  const saveImage = async image => {
    setUser({...user, image});
    await User.update({id: user._id, data: {...user, image}});
    Storage.set('user', {...user, image});
  };
  const deleteImage = async () => {
    setUser({...user, image: ''});
    await User.update({id: user._id, data: {...user, image: ''}});
    Storage.set('user', {...user, image: ''});
  };
  const firstNameShow = () => {
    firstName.snapToIndex(0);
  };
  const lastNameShow = () => {
    lastName.snapToIndex(0);
  };
  const emailShow = () => {
    email.snapToIndex(0);
  };
  const passwordShow = () => {
    password.snapToIndex(0);
  };
  const nicknameShow = () => {
    nickname.snapToIndex(0);
  };
  const phoneShow = () => {
    phone.snapToIndex(0);
  };
  const handleChange = index => {
    if (index === -1) {
      setCode('');
    }
  };
  const modalSettings = () => {
    settings.snapToIndex(0);
  };
  const saveData = async name => {
    const res = await User.update({id: user._id, data: userUpdate});
    Storage.set('user', userUpdate);
    setUser(userUpdate);
    name.close();
  };

  const updateNickame = async nickname => {
    setUserUpdate({...userUpdate, nickname});
    if (user.nickname == userUpdate.nickname) {
      setExistNickname(null);
    }
    const {code} = await nicknamePrepare({nickname});
    if (code === 0) {
      setExistNickname(false);
    } else {
      setExistNickname(true);
    }
  };
  const savePhone = () => {
    if (isCheckCode) {
      saveData(phone);
      Sms.smsDelete(userUpdate.phone);
      changePhone.snapToIndex(0);
    } else {
      Alert.alert('неверный код');
    }
  };
  const logout = () => {
    Storage.clear();
    props.navigation.navigate('Start');
  };
  const timeOutRepeatCode = () => {
    setTimeout(() => {
      setIsrepeatCode(true);
    }, 30000);
  };
  const sendCode = async () => {
    setIsSendCode(true);
    setIsrepeatCode(false);

    // await User.restore.prepare(userUpdate.phone);
    await Sms.restore(userUpdate.phone);
    timeOutRepeatCode();
  };
  const checkCode = async Code => {
    // const {code} = await User.restore.check(userUpdate.phone, Code);
    const {code} = await Sms.check(userUpdate.phone, Code);
    console.log({code});
    if (code === 0) {
      setCheckCode(true);
    } else {
      setCheckCode(false);
    }
  };
  const changeCode = number => {
    setCode(number);
    if (number.length == 4) {
      checkCode(number);
    } else {
      if (checkCode) {
        setCheckCode(false);
      }
    }
  };

  //checkPassword
  const checkPassword = async () => {
    passwordShow();
    if (oldPassword.length > 2) {
      const {code} = await User.passwordPrepare({
        id: user._id,
        password: oldPassword,
      });
      if (code === 0) {
        setIsOldPassword(true);
      } else {
        setIsOldPassword(false);
      }
    }
  };
  const matchedPassword = (type, text) => {
    if (type == 'one') {
      setNewPassword(text);
    } else if (type == 'two') {
      setRepeatNewPassword(text);
    }
    if (newPassword.length && repeatNewPassword.length) {
      if (type == 'one' && text === repeatNewPassword) {
        setPasswordMatched(true);
      } else if (type == 'two' && text === newPassword) {
        setPasswordMatched(true);
      } else {
        setPasswordMatched(false);
      }
    }
  };
  const changePassword = async () => {
    if (passwordMatched && isOldPassword) {
      const res = await User.restore.finish(user._id, newPassword);
      password.close();
      changePasswordBS.snapToIndex(0);
      setIsOldPassword(null);
      setOldPassword('');
      setNewPassword('');
      setRepeatNewPassword('');
      setPasswordMatched(null);
    } else if (!passwordMatched) {
      Alert.alert('Пароли не совпадают');
    } else if (!isOldPassword) {
      Alert.alert('Неверный старый пароль');
    }
  };
  //start
  return (
    <>
      <Template styles={styles} loading={loading}>
        {loading ? null : (
          <>
            <StatusBar backgroundColor={'#242424'} />
            <View style={s.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={s.headerBlock}>
                  <View style={[styles.spaceBetween]}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                      <SvgXml
                        xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_15800)"><path d="M16 14L12 10L8 14" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_15800"><rect width="24" height="24" fill="white" transform="translate(0 24) rotate(-90)"/></clipPath></defs></svg>`}
                      />
                    </TouchableOpacity>
                    <Text style={s.title}>Личные данные</Text>
                    <SvgXml
                      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_15800)"><path d="M16 14L12 10L8 14" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_180_15800"><rect width="24" height="24" fill="white" transform="translate(0 24) rotate(-90)"/></clipPath></defs></svg>`}
                      style={{opacity: 0}}
                    />
                  </View>
                  <View style={s.avatar}>
                    {user?.image ? (
                      <Image
                        style={{width: 100, height: 100, borderRadius: 100}}
                        source={{uri: `data:image/png;base64,${user.image}`}}
                      />
                    ) : (
                      <View
                        style={[
                          {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 50,
                            width: 100,
                            height: 100,
                          },
                          styles.center,
                        ]}>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: '500',
                          }}>
                          {user.firstName.slice(0, 1)}
                        </Text>
                      </View>
                    )}
                    <View style={s.settings}>
                      <TouchableOpacity onPress={modalSettings}>
                        <SvgXml xml={icons.settings} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={s.bottomBlock}>
                  <InputDate
                    key={'firstName'}
                    title={'Имя'}
                    data={user.firstName}
                    type="firstName"
                    panelShow={firstNameShow}
                  />
                  <InputDate
                    title={'Фамилия'}
                    data={user.lastName}
                    panelShow={lastNameShow}
                    type="lastName"
                    key="lastName"
                  />
                  <InputDate
                    title={'Никнейм'}
                    data={user.nickname}
                    type="nickname"
                    key="nickname"
                    panelShow={nicknameShow}
                  />
                  <InputDate
                    title={'Номер телефона'}
                    data={user.phone}
                    type="phone"
                    key="phone"
                    panelShow={phoneShow}
                  />
                  <InputDate
                    title={'E-mail'}
                    data={user.email}
                    panelShow={emailShow}
                    type={'email'}
                    key={'email'}
                  />
                  <InputDate
                    title={'Пароль учетной записи'}
                    data={user.password}
                    type="password"
                    key="password"
                    panelShow={passwordShow}
                    end
                  />
                  <TouchableOpacity style={s.logout} onPress={logout}>
                    <Text style={s.logoutText}>Выйти</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </Template>
      {/* firstName */}
      <BottomSheet
        ref={r => (firstName = r)}
        index={-1}
        snapPoints={[300]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View style={s.BSWrapper}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить имя</Text>
            </View>
            <BottomSheetTextInput
              onBlur={() => firstName.snapToIndex(0)}
              defaultValue={user.firstName}
              onChangeText={firstName =>
                setUserUpdate({...userUpdate, firstName})
              }
              style={[s.changeTitle, s.inputText]}
            />
            <TouchableOpacity
              style={s.saveBtn}
              onPress={() => saveData(firstName)}>
              <Text style={s.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      {/* lastName */}
      <BottomSheet
        ref={r => (lastName = r)}
        index={-1}
        snapPoints={[300]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View style={s.BSWrapper}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить фамилию</Text>
            </View>
            <BottomSheetTextInput
              onBlur={() => lastName.snapToIndex(0)}
              defaultValue={user.lastName}
              onChangeText={lastName =>
                setUserUpdate({...userUpdate, lastName})
              }
              style={[s.changeTitle, s.inputText]}
            />
            <TouchableOpacity
              style={s.saveBtn}
              onPress={() => saveData(lastName)}>
              <Text style={s.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      {/* email */}
      <BottomSheet
        ref={r => (email = r)}
        index={-1}
        snapPoints={[300]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View style={s.BSWrapper}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить E-mail</Text>
            </View>
            <BottomSheetTextInput
              onBlur={() => email.snapToIndex(0)}
              defaultValue={user.email}
              onChangeText={email => setUserUpdate({...userUpdate, email})}
              style={[s.changeTitle, s.inputText]}
            />
            <TouchableOpacity style={s.saveBtn} onPress={() => saveData(email)}>
              <Text style={s.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      {/* password */}
      <BottomSheet
        ref={r => (password = r)}
        index={-1}
        snapPoints={[435]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View style={s.BSWrapper}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить пароль</Text>
            </View>
            <View
              style={[s.changeTitle, {paddingRight: 24}, styles.spaceBetween]}>
              <BottomSheetTextInput
                onBlur={checkPassword}
                placeholder={'Старый пароль'}
                value={oldPassword}
                onChangeText={password => setOldPassword(password)}
                style={[s.inputText, {flex: 1, paddingVertical: 0}]}
                placeholderTextColor={'#5b5b5b'}
              />
              {isOldPassword !== null ? (
                isOldPassword ? (
                  <View style={styles.center}>
                    <SvgXml xml={icons.noExistNickname} />
                  </View>
                ) : (
                  <View>
                    <SvgXml xml={icons.existNickname} />
                  </View>
                )
              ) : null}
            </View>
            <View style={[s.sendCOD]}>
              <View style={styles.spaceBetween}>
                <BottomSheetTextInput
                  placeholder={'Новый пароль'}
                  style={[
                    s.changeTitle,
                    s.inputText,
                    {
                      paddingBottom: 10,
                      paddingLeft: 0,
                      flex: 1,
                    },
                  ]}
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={pswrd => {
                    matchedPassword('one', pswrd);
                  }}
                  placeholderTextColor={'#5b5b5b'}
                />
                {passwordMatched && <SvgXml xml={icons.noExistNickname} />}
              </View>
              <View style={[s.hr, s.hrLigth]}></View>
              <View style={styles.spaceBetween}>
                <BottomSheetTextInput
                  // onBlur={() => password.snapToIndex(0)}
                  placeholder={'Повторите новый пароль'}
                  secureTextEntry={true}
                  style={[
                    s.changeTitle,
                    s.inputText,
                    {paddingLeft: 0, paddingTop: 10, flex: 1},
                  ]}
                  value={repeatNewPassword}
                  onChangeText={pswrd => {
                    matchedPassword('two', pswrd);
                  }}
                  placeholderTextColor={'#5b5b5b'}
                />
                {passwordMatched !== null ? (
                  passwordMatched ? (
                    <SvgXml xml={icons.noExistNickname} />
                  ) : (
                    <>
                      <Text style={s.existNickname}>пароли не совпадают</Text>
                      <SvgXml xml={icons.existNickname} />
                    </>
                  )
                ) : null}
              </View>
            </View>
            <TouchableOpacity style={s.saveBtn} onPress={changePassword}>
              <Text style={s.saveText}>Изменить</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      {/* nickname */}
      <BottomSheet
        ref={r => (nickname = r)}
        index={-1}
        snapPoints={[300]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View style={s.BSWrapper}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить никнейм</Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.spaceBetween, s.nicknameBlock]}
              onPress={() => input.focus()}>
              <View>
                <Text style={[s.inputText, s.textAbsolute]}>@</Text>
                <BottomSheetTextInput
                  ref={r => (input = r)}
                  onBlur={() => nickname.snapToIndex(0)}
                  defaultValue={user.nickname}
                  onChangeText={updateNickame}
                  style={[s.nicknameText]}
                />
              </View>

              {existNickname !== null &&
              user.nickname !== userUpdate.nickname ? (
                <View style={styles.center}>
                  {existNickname && (
                    <Text style={s.existNickname}>Никнейм занят</Text>
                  )}
                  <SvgXml
                    xml={
                      existNickname
                        ? icons.existNickname
                        : icons.noExistNickname
                    }
                  />
                </View>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              style={s.saveBtn}
              onPress={() => (existNickname ? null : saveData(nickname))}>
              <Text style={s.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      {/* phone */}
      <BottomSheet
        ref={r => (phone = r)}
        index={-1}
        snapPoints={[350]}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        <View style={s.handleIndicatorStyle}></View>
        {loading ? null : (
          <View
            style={{
              backgroundColor: '#0F0F0F',
              borderRadius: 36,
              paddingBottom: 300,
            }}>
            <View style={s.changeTitle}>
              <Text style={s.modalTitle}>Изменить телефон</Text>
            </View>
            <View style={[s.sendCOD]}>
              <View style={[styles.spaceBetween]}>
                <BottomSheetTextInput
                  onBlur={() => phone.snapToIndex(0)}
                  defaultValue={user.phone}
                  maxLength={11}
                  onChangeText={phone => setUserUpdate({...userUpdate, phone})}
                  keyboardType={'number-pad'}
                  placeholder={'Введите номер'}
                  placeholderTextColor={'#5b5b5b'}
                  style={[
                    s.inputText,
                    {
                      paddingLeft: 0,
                      paddingBottom: 10,
                      width: width - 220,
                      flex: 1,
                    },
                  ]}
                />
                {isSendCode ? (
                  <TouchableOpacity disabled={!isrepeatCode} onPress={sendCode}>
                    <Text
                      style={[
                        s.sendCODText,
                        !isrepeatCode ? {opacity: 0.2} : {},
                      ]}>
                      Отправить код повторно
                    </Text>
                  </TouchableOpacity>
                ) : userUpdate.phone.length === 11 ? (
                  <TouchableOpacity onPress={sendCode}>
                    <Text style={s.sendCODText}>Отправить код</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{opacity: 0.2}}>
                    <Text style={s.sendCODText}>Отправить код</Text>
                  </View>
                )}
              </View>
              <View style={[s.hr, s.hrLigth]}></View>
              <View style={[styles.spaceBetween, {marginBottom: 12}]}>
                <BottomSheetTextInput
                  placeholder="Код из СМС"
                  value={code}
                  maxLength={4}
                  onChangeText={changeCode}
                  placeholderTextColor={'#5b5b5b'}
                  style={[s.codeText]}
                  keyboardType={'phone-pad'}
                />
                {isCheckCode !== null && code.length ? (
                  <View style={[styles.center]}>
                    {isCheckCode ? (
                      <SvgXml xml={icons.noExistNickname} />
                    ) : (
                      <>
                        <Text style={s.existNickname}>Неверный код</Text>
                        <SvgXml xml={icons.existNickname} />
                      </>
                    )}
                  </View>
                ) : null}
              </View>
            </View>
            {isCheckCode ? (
              <TouchableOpacity style={s.saveBtn} onPress={savePhone}>
                <Text style={s.saveText}>Изменить</Text>
              </TouchableOpacity>
            ) : (
              <View style={[s.saveBtn, {opacity: 0.2}]}>
                <Text style={s.saveText}>Изменить</Text>
              </View>
            )}
          </View>
        )}
      </BottomSheet>
      {/* settings */}
      <BottomSheet
        ref={r => (settings = r)}
        index={-1}
        snapPoints={[300]}
        backgroundStyle={{
          backgroundColor: '#090909',
        }}
        keyboardBehavior="interactive"
        onChange={handleChange}
        enablePanDownToClose={false}
        handleComponent={null}
        backdropComponent={p => (
          <BottomSheetBackdrop
            {...p}
            pressBehavior={'close'}
            disappearsOnIndex={-1}
            opacity={0.7}
            appearsOnIndex={0}
          />
        )}>
        {loading ? null : (
          <View style={s.settingsWrapper}>
            <Text style={[s.hr, s.settingsTitle]}>Фотография профиля</Text>
            <TouchableOpacity onPress={library}>
              <Text style={s.settingsText}>Выбрать из библиотеки</Text>
            </TouchableOpacity>
            <View style={s.hr}></View>
            <TouchableOpacity onPress={camera}>
              <Text style={s.settingsText}>Сделать фото</Text>
            </TouchableOpacity>
            <View style={s.hr}></View>
            <TouchableOpacity onPress={deleteImage}>
              <Text style={[s.settingsText, s.removeImage]}>Удалить фото</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.settingsCancel}
              onPress={() => settings.close()}>
              <Text style={s.settingsText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
      <BottomSheet
        ref={r => (changePasswordBS = r)}
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
              {textAlign: 'center'},
            ]}>
            Пароль{'\r\n'}успешно изменен
          </Text>
          <View style={[styles.buttonsblock, s.buttonsblock]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => changePasswordBS.close()}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Продолжить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        ref={r => (changePhone = r)}
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
              {textAlign: 'center'},
            ]}>
            Номер{'\r\n'}успешно изменен
          </Text>
          <View style={[styles.buttonsblock, s.buttonsblock]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => changePhone.close()}>
              <Text style={[styles.text, styles.bold, styles.white]}>
                Продолжить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};
const radius = 36;
const {height, width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  BSWrapper: {
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingBottom: 24,
  },
  headerBlock: {
    // paddingTop: 18,
    paddingTop: 38,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderRadius: radius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#242424',
    marginBottom: 4,
    flex: 1,
  },
  title: {
    color: '#858383',
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '400',
  },
  avatar: {
    position: 'relative',
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 26,
  },
  settings: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 2,
    borderRadius: 40,
    backgroundColor: '#242424',
  },
  bottomBlock: {
    padding: 24,
    borderRadius: radius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#242424',
    height: height > 800 ? height - 150 : height < 700 ? height : height - 100,
  },
  changeTitle: {
    backgroundColor: '#242424',
    paddingVertical: 24,
    borderRadius: radius,
    marginBottom: 4,
  },
  modalTitle: {
    ...styles.white,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
  },
  inputText: {
    ...styles.white,
    paddingLeft: 24,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    paddingVertical: 28,
    position: 'relative',
  },
  nicknameText: {
    ...styles.white,
    paddingLeft: 35,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    paddingVertical: 28,
    position: 'relative',
    width: width - 200,
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
  nicknameBlock: {
    paddingRight: 24,
    backgroundColor: '#242424',
    borderRadius: 36,
  },
  sendCOD: {
    paddingHorizontal: 24,
    backgroundColor: '#242424',
    borderRadius: 36,
  },
  sendCODText: {
    color: '#CA86FF',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: -10,
  },
  textAbsolute: {
    position: 'absolute',
    paddingLeft: 0,
    paddingVertical: 0,
    zIndex: 100,
    width: 15,
    left: 18,
    top: 31,
  },
  codeText: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    paddingVertical: 11,
    ...styles.white,
    flex: 1,
  },
  handleIndicatorStyle: {
    backgroundColor: 'rgba(255,255,255, 0.2)',
    width: 32,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  saveBtn: {
    marginTop: 36,
    width: width - 48,
    backgroundColor: '#A03BEF',
    borderRadius: 30,
    paddingVertical: 19,
    alignSelf: 'center',
  },
  saveText: {
    textAlign: 'center',
    ...styles.white,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
  },
  settingsWrapper: {
    paddingHorizontal: 8,
  },
  settingsTitle: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    paddingVertical: 12,
  },
  settingsText: {
    color: '#0A84FF',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    paddingVertical: 18,
    textAlign: 'center',
  },
  removeImage: {
    color: '#FF453A',
  },
  settingsCancel: {
    backgroundColor: '#1C1C1E',
    borderRadius: 13,
  },
  hr: {
    borderBottomColor: 'rgba(24, 24, 24, 0.7)',
    borderBottomWidth: 2,
    width: '100%',
  },
  hrLigth: {
    backgroundColor: '#5b5b5b',
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
    paddingBottom: 20,
  },
  check: {
    width: 219,
    height: 184,
    marginLeft: 80,
  },
  logout: {
    padding: 10,
    paddingLeft: 0,
    marginTop: 40,
    width: 60,
  },
  logoutText: {
    color: '#5b5b5b',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
  },
});
