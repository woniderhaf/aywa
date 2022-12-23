/*
 * (c) pavit.design, 2022
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  PermissionsAndroid,
  Dimensions,
  Linking,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import Animated, {
  Layout,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  Transition,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
//components
import Template from '../../components/Template';
import SearchDevice from '../../components/searchDevice';
//plug-ins
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BleManager from 'react-native-ble-manager';
import {App, Storage} from '../../helpers/Index';
import {SvgXml} from 'react-native-svg';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
//styles
import styles from '../../styles/Styles';
import {ScrollView} from 'react-native-gesture-handler';
//constants
const icons = {
  settings: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.74529 3.25C4.84404 3.25 3.25 4.73716 3.25 6.63548C3.25 8.53507 4.84424 10.021 6.74529 10.021C8.64635 10.021 10.2406 8.53507 10.2406 6.63548C10.2406 4.73716 8.64655 3.25 6.74529 3.25ZM4.75 6.63548C4.75 5.62271 5.61417 4.75 6.74529 4.75C7.87642 4.75 8.74059 5.62271 8.74059 6.63548C8.74059 7.64913 7.87662 8.52096 6.74529 8.52096C5.61396 8.52096 4.75 7.64913 4.75 6.63548ZM13.7356 6.63595C13.7356 6.22174 14.0714 5.88595 14.4856 5.88595H21.3825C21.7967 5.88595 22.1325 6.22174 22.1325 6.63595C22.1325 7.05016 21.7967 7.38595 21.3825 7.38595H14.4856C14.0714 7.38595 13.7356 7.05016 13.7356 6.63595ZM16.6418 17.365C16.6418 16.3513 17.5058 15.4795 18.6371 15.4795C19.7685 15.4795 20.6324 16.3513 20.6324 17.365C20.6324 18.3777 19.7683 19.2505 18.6371 19.2505C17.506 19.2505 16.6418 18.3777 16.6418 17.365ZM18.6371 13.9795C16.7361 13.9795 15.1418 15.4654 15.1418 17.365C15.1418 19.2633 16.7359 20.7505 18.6371 20.7505C20.5384 20.7505 22.1324 19.2633 22.1324 17.365C22.1324 15.4654 20.5382 13.9795 18.6371 13.9795ZM4.00049 16.6145C3.58627 16.6145 3.25049 16.9503 3.25049 17.3645C3.25049 17.7787 3.58627 18.1145 4.00049 18.1145H10.8962C11.3105 18.1145 11.6462 17.7787 11.6462 17.3645C11.6462 16.9503 11.3105 16.6145 10.8962 16.6145H4.00049Z" fill="url(#paint0_linear_179_6498)"/><defs><linearGradient id="paint0_linear_179_6498" x1="-6.19124" y1="-39.0428" x2="11.0695" y2="32.2931" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  pen: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_179_6510)"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 20H7.99091C8.39991 19.9997 8.7921 19.8372 9.08151 19.5482L16.0067 12.623C15.9635 12.5964 15.9226 12.5643 15.8851 12.5268L11.4733 8.11502C11.4358 8.07748 11.4037 8.03655 11.377 7.99322L4.45177 14.9185C4.30851 15.0617 4.19487 15.2317 4.11735 15.4188C4.03983 15.606 3.99996 15.8065 4 16.0091V19.5C4 19.7761 4.22386 20 4.5 20ZM12.2874 7.08288C12.3307 7.10951 12.3716 7.1416 12.4092 7.17914L16.821 11.5909C16.8585 11.6284 16.8905 11.6693 16.9171 11.7126L18.5475 10.0823C18.6909 9.9391 18.8047 9.76904 18.8824 9.58182C18.96 9.39461 19 9.19392 19 8.99124C19 8.78856 18.96 8.58787 18.8824 8.40066C18.8047 8.21344 18.6909 8.04338 18.5475 7.9002L16.0998 5.45254C15.9566 5.30908 15.7866 5.19527 15.5993 5.11762C15.4121 5.03997 15.2114 5 15.0088 5C14.8061 5 14.6054 5.03997 14.4182 5.11762C14.231 5.19527 14.0609 5.30908 13.9177 5.45254L12.2874 7.08288Z" fill="url(#paint0_linear_179_6510)"/></g><defs><linearGradient id="paint0_linear_179_6510" x1="-3.5" y1="-31.25" x2="12.3192" y2="29.3432" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_179_6510"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  noti: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_48_16090)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.3987 17.3987C19.0137 17.7837 18.4915 18 17.947 18H14.49V18.511C14.49 18.8379 14.4256 19.1617 14.3005 19.4637C14.1753 19.7658 13.9919 20.0402 13.7606 20.2713C13.5294 20.5025 13.2549 20.6858 12.9528 20.8108C12.6507 20.9358 12.327 21.0001 12 21C11.6731 21.0003 11.3494 20.9361 11.0473 20.8112C10.7452 20.6863 10.4707 20.503 10.2394 20.272C10.0082 20.0409 9.82475 19.7666 9.69959 19.4646C9.57443 19.1626 9.51001 18.8389 9.51001 18.512V18H6.053C5.50851 18 4.98632 17.7837 4.60131 17.3987C4.2163 17.0137 4 16.4915 4 15.947C4.00046 15.371 4.22916 14.8187 4.636 14.411L6 13.048V9C6 7.4087 6.63214 5.88258 7.75736 4.75736C8.88258 3.63214 10.4087 3 12 3C13.5913 3 15.1174 3.63214 16.2426 4.75736C17.3679 5.88258 18 7.4087 18 9V13.048L19.364 14.411C19.7708 14.8187 19.9995 15.371 20 15.947C20 16.4915 19.7837 17.0137 19.3987 17.3987Z" fill="url(#paint0_linear_48_16090)"/></g><defs><linearGradient id="paint0_linear_48_16090" x1="-4" y1="-40.5" x2="17" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_48_16090"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  geo: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_48_15616)"><path d="M12.6843 18.4544C12.782 18.9325 13.4367 19.0019 13.6323 18.5547L19.4878 5.17065C19.6702 4.75378 19.2462 4.32978 18.8294 4.51216L5.44785 10.3666C5.00048 10.5623 5.07018 11.2174 5.54871 11.3146L11.1478 12.4521C11.3444 12.4921 11.4981 12.6456 11.5382 12.8421L12.6843 18.4544Z" fill="url(#paint0_linear_48_15616)"/></g><defs><linearGradient id="paint0_linear_48_15616" x1="-4" y1="-34.6667" x2="12.8738" y2="29.9661" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_48_15616"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  arrowRT: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_48_16097)"><path d="M17.3026 6.71094L6.70302 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82362 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_48_16097"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_12597)"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.13291 5.51081C5.88405 4.70188 7.31202 4.69857 8.22944 5.54065C9.10453 6.42584 9.07233 7.76099 8.23964 8.53421C7.32222 9.3861 5.96982 9.38501 5.21624 8.57346C4.37319 7.66556 4.34289 6.36159 5.13291 5.51081ZM9.26032 4.45087C7.84399 3.13571 5.44645 2.96872 4.03372 4.49013C2.65707 5.97268 2.79344 8.16871 4.11705 9.59414C5.53014 11.1159 7.84441 10.9482 9.26032 9.6334C10.7579 8.24282 10.7285 5.91837 9.28031 4.47014C9.27377 4.46359 9.2671 4.45717 9.26032 4.45087ZM2.41675 15.8335C2.41675 14.4144 3.58096 13.2502 5.00008 13.2502H8.33341C9.75253 13.2502 10.9167 14.4144 10.9167 15.8335C10.9167 16.2477 11.2525 16.5835 11.6667 16.5835C12.081 16.5835 12.4167 16.2477 12.4167 15.8335C12.4167 13.586 10.581 11.7502 8.33341 11.7502H5.00008C2.75253 11.7502 0.916748 13.586 0.916748 15.8335C0.916748 16.2477 1.25253 16.5835 1.66675 16.5835C2.08096 16.5835 2.41675 16.2477 2.41675 15.8335ZM12.5835 11.6672C12.5835 11.253 12.9193 10.9172 13.3335 10.9172H15.8335C17.6644 10.9172 19.0835 12.3363 19.0835 14.1672C19.0835 14.5814 18.7477 14.9172 18.3335 14.9172C17.9193 14.9172 17.5835 14.5814 17.5835 14.1672C17.5835 13.1647 16.8359 12.4172 15.8335 12.4172H13.3335C12.9193 12.4172 12.5835 12.0814 12.5835 11.6672ZM13.697 6.11449C14.1358 5.67564 15.0023 5.63459 15.5669 6.12861C16.1091 6.68535 16.0634 7.50973 15.5816 7.94336C14.9776 8.48696 14.1313 8.45148 13.7241 7.99911C13.1805 7.3951 13.216 6.54877 13.6684 6.14163C13.6782 6.13284 13.6877 6.12379 13.697 6.11449ZM16.5851 5.02669C15.4874 4.0388 13.7095 3.99686 12.6504 5.03989C11.4523 6.13417 11.6566 7.94416 12.6092 9.00255C13.7021 10.2168 15.5224 10.0147 16.5851 9.0583C17.7658 7.99561 17.7235 6.16367 16.6137 5.05383C16.6044 5.04454 16.5948 5.03549 16.5851 5.02669Z" fill="url(#paint0_linear_180_12597)"/></g><defs><linearGradient id="paint0_linear_180_12597" x1="-8.16663" y1="-28.4388" x2="2.22782" y2="26.4511" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_180_12597"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`,
  progress: `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.7682 6.51374C22.8534 6.5802 22.9298 6.65748 22.9953 6.7435C23.0315 6.79102 23.0638 6.84053 23.0923 6.89162C23.1928 7.07168 23.2501 7.27915 23.2501 7.5V14.505C23.2501 15.1954 22.6905 15.755 22.0001 15.755C21.3098 15.755 20.7501 15.1954 20.7501 14.505V10.5176L12.8839 18.3839C12.3957 18.872 11.6043 18.872 11.1161 18.3839L7 14.2678L2.88388 18.3839C2.39573 18.872 1.60427 18.872 1.11612 18.3839C0.627961 17.8957 0.627961 17.1043 1.11612 16.6161L6.11612 11.6161C6.60427 11.128 7.39573 11.128 7.88388 11.6161L12 15.7322L18.9822 8.75H14.9951C14.3048 8.75 13.7451 8.19036 13.7451 7.5C13.7451 6.80964 14.3048 6.25 14.9951 6.25H22H22.0001C22.2897 6.25 22.5563 6.34846 22.7682 6.51374Z" fill="url(#paint0_linear_180_12549)"/><defs><linearGradient id="paint0_linear_180_12549" x1="-10.5001" y1="-23.9583" x2="-2.83839" y2="28.8664" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  energy: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_180_12577)"><path d="M13.1904 1.92247C13.2611 1.41065 12.6038 1.14088 12.2946 1.55482L3.09703 13.8674C2.85071 14.1972 3.08602 14.6667 3.4976 14.6667H11.5928C11.8962 14.6667 12.1297 14.9346 12.0881 15.2351L11.1429 22.0775C11.0722 22.5894 11.7296 22.8591 12.0388 22.4452L21.2363 10.1326C21.4826 9.80283 21.2473 9.33333 20.8357 9.33333H12.7405C12.4371 9.33333 12.2037 9.0654 12.2452 8.76491L13.1904 1.92247Z" fill="url(#paint0_linear_180_12577)"/></g><defs><linearGradient id="paint0_linear_180_12577" x1="-7.16667" y1="-58" x2="23.2051" y2="35.7139" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_180_12577"><rect width="24" height="24" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`,
  noImage: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"fill="#000000" stroke="none"><path d="M223 616 c-93 -30 -181 -124 -203 -218 -35 -143 34 -289 170 -359 64-34 194 -34 262 -1 60 30 120 90 150 150 33 68 33 198 -1 262 -32 62 -86 117-146 147 -61 32 -168 40 -232 19z m183 -21 c27 -8 63 -26 79 -39 l30 -24 -34-36 c-19 -20 -40 -36 -46 -36 -6 0 -19 14 -28 30 -17 29 -21 30 -87 30 -66 0-70 -1 -87 -30 -19 -32 -33 -39 -33 -15 0 8 -4 15 -10 15 -5 0 -10 7 -10 15 09 -9 15 -25 15 -16 0 -25 -6 -25 -15 0 -8 -3 -15 -8 -15 -22 0 -32 -64 -30-191 3 -131 3 -133 27 -139 22 -5 23 -6 6 -20 -15 -13 -20 -11 -41 13 -27 32-54 115 -54 167 0 113 86 235 190 270 67 23 120 25 186 5z m155 -116 c26 -3849 -110 49 -159 0 -76 -28 -140 -89 -201 -61 -61 -125 -89 -201 -89 -52 0-130 26 -165 54 l-30 24 24 26 c24 25 25 26 210 28 l186 3 0 145 0 145 -34 3-33 3 23 25 c29 31 33 30 60 -7z m-164 -13 c28 -44 14 -62 -36 -45 -94 33-185 -58 -152 -153 10 -29 9 -34 -16 -60 -17 -18 -37 -28 -55 -28 l-28 0 0130 0 130 59 0 c56 0 61 2 78 30 16 28 22 30 73 30 52 0 56 -2 77 -34z m-224-3 c-7 -2 -21 -2 -30 0 -10 3 -4 5 12 5 17 0 24 -2 18 -5z m357 -153 l0 -130-167 0 -167 0 20 20 c19 19 22 20 53 4 97 -48 205 60 157 157 -16 31 -15 33 656 15 16 33 23 60 23 l38 0 0 -130z m-171 91 c22 -14 -3 -39 -33 -34 -33 7-70 -30 -63 -63 5 -30 -20 -55 -34 -33 -22 36 -1 101 42 125 28 15 68 18 88 5zm55 -63 c25 -72 -50 -147 -123 -122 -43 16 -33 39 17 39 53 0 76 24 67 71 -950 22 60 39 12z m-105 -14 c-13 -14 -25 -20 -27 -14 -5 15 17 40 36 40 12 010 -6 -9 -26z m51 -12 c0 -23 -19 -42 -42 -42 -24 0 -23 9 4 37 26 28 38 2938 5z"/><path d="M130 310 l0 -100 25 0 25 0 0 100 0 100 -25 0 -25 0 0 -100z m27 -42c-2 -24 -4 -5 -4 42 0 47 2 66 4 43 2 -24 2 -62 0 -85z"/><path d="M450 405 c0 -22 4 -25 35 -25 31 0 35 3 35 25 0 22 -4 25 -35 25 -310 -35 -3 -35 -25z m47 -1 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13-5z"/></g></svg>`,
};
const emptyArray = ['', '', '', '', '', '', '', '', '', '', '', ''];
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Разрешение на геолокацию',
        message: 'Можем ли мы получить доступ к вашему местоположению?',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

//start
export default Profile = props => {
  const goto = (link, data) => props.navigation.navigate(link, data);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(4);
  const [energy, setEnergy] = useState(6);
  const [user, setUser] = useState(null);
  const [islocation, isSetLocation] = useState(true);
  const [isGeoposition, setIsGeoposition] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const [peripherals,setPeripherals] = useState([])
  const searchDevice = useRef(null)
  useEffect(() => {
    App.prepare(props.navigation, async userStorage => {
      // BleManager.start({showAlert: false});
      let notifications = await Storage.get('notifications');
      if (notifications) {
        notifications = await JSON.parse(notifications);
        if (
          notifications.isNewNFT &&
          notifications.isMeditation &&
          notifications.isNews
        ) {
          setIsNotifications(true);
        }
      }
      setUser(userStorage);
      isGetLocation();
      setLoading(false);
    });
    props.navigation.addListener('didFocus', payload => {
      App.prepare(props.navigation, async user => {
        setUser(user);
      });
    });
  }, []);
  console.log('IMAGE',user?.image);

  const getLocation = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      setIsGeoposition(true);
      return true;
    } else {
      return false;
    }
  };
  const turnNotifications = async () => {
    Storage.set('notifications', {
      isNews: true,
      isMeditation: true,
      isNewNFT: true,
    });
    setIsNotifications(true);
  };
  const settingsApp = async () => {
    Linking.openSettings();
  };
  const enableGeolocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            isSetLocation(false);
          })
          .catch(err => {
            console.log({err});
          });
      }
    });
  };
  const isGetLocation = async () => {
    const isgetLocation = getLocation();
    if (isgetLocation) {
      const result = requestLocationPermission();
      result.then(async res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              isSetLocation(false);
            },
            error => {
              isSetLocation(true);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }
  };



  //
  const handleDiscoverPeripheral = peripheral => {
    if (peripheral.name) {
      if (this.state.peripherals?.length) {
        this.state.peripherals.forEach((v, i) => {
          if (v.id !== peripheral.id) {
            setPeripherals( [...this.state.peripherals, peripheral])
          }
        });
      } else {
        setPeripherals([...this.state.peripherals, peripheral])
      }
    }
  }

  // const BleManagerModule = NativeModules.BleManager;
  // const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  // BleManagerEmitter.addListener(
  //   'BleManagerDiscoverPeripheral',
  //   handleDiscoverPeripheral,
  // );

  // if (Platform.OS === 'android' && Platform.Version >= 23) {
  //   PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   ).then(result => {
  //     if (result) {
  //       console.log('Permission is OK');
  //     } else {
  //       PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       ).then(result => {
  //         if (result) {
  //           console.log('User accept');
  //         } else {
  //           console.log('User refuse');
  //         }
  //       });
  //     }
  //   });
  // }



  //
  return (
    <>
      <Template
        page={'Profile'}
        loading={loading}
        styles={styles}
        navigation={props.navigation}>
        {loading ? null : (
          <View style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={s.settings}
                onPress={() => goto('Settings')}>
                <SvgXml xml={icons.settings} />
              </TouchableOpacity>
              {user.image ? (
                <Image
                  source={{uri: `data:image/png;base64,${user.image}`}}
                  style={s.avatar}
                />
              ) : (
                <View
                  style={[
                    {
                      backgroundColor: '#242424',
                    },
                    s.avatar,
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
              <Text style={s.name}>{`${user.firstName} ${user.lastName}`}</Text>
              <TouchableOpacity
                style={s.personalData}
                onPress={() => goto('PersonalData')}>
                <Text style={s.personalDataText}>Личные данные</Text>
                <SvgXml xml={icons.pen} />
              </TouchableOpacity>
              <View style={[styles.spaceBetween, {marginTop: 48}]}>
                {!isNotifications && (
                  <Animated.View
                    exiting={isNotifications ? LightSpeedOutLeft : null}
                    layout={Layout.duration(500)}
                    style={[s.blockDescr, {marginRight: 4}]}>
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 9,
                        paddingVertical: 24,
                      }}>
                      <SvgXml xml={icons.noti} />
                      <Text style={s.blockTitle}>Уведомления</Text>
                      <Text style={s.blockText}>
                        Включите уведомления, чтобы не пропустить важную
                        инфомрацию
                      </Text>
                    </View>
                    <View style={[s.blockBottom, styles.spaceBetween]}>
                      <TouchableOpacity
                        style={s.detail}
                        onPress={turnNotifications}>
                        <Text style={[s.detailText, styles.white]}>
                          Включить
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                )}
                {islocation && (
                  <Animated.View
                    exiting={
                      isGeoposition
                        ? isNotifications
                          ? LightSpeedOutLeft
                          : LightSpeedOutRight
                        : null
                    }
                    layout={Layout.duration(500)}
                    style={[s.blockDescr, isGeoposition ? {} : {opacity: 0.4}]}>
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 9,
                        paddingVertical: 24,
                      }}>
                      <SvgXml xml={icons.geo} />
                      <Text style={s.blockTitle}>Геопозиция</Text>
                      <Text style={s.blockText}>
                        Геопозиция позволит найти вас другим пользователям
                      </Text>
                    </View>
                    <View style={[s.blockBottom, styles.spaceBetween]}>
                      <TouchableOpacity
                        style={s.detail}
                        onPress={
                          isGeoposition ? enableGeolocation : settingsApp
                        }>
                        <Text style={[s.detailText, styles.white]}>
                          Включить
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                )}
              </View>
              <Animated.View layout={Layout.duration(500)}>
                <Text style={s.Title}>фитнес трекер</Text>
                <View style={s.isWatch}>
                  <Image
                    source={require('./Images/watch.png')}
                    style={{alignSelf: 'center'}}
                  />
                  <Text style={s.treckerTitle}>Подключение браслета</Text>
                  <View style={s.treckerBottom}>
                    <Text style={s.treckerText}>
                      Для работы приложения Вам необходимо подключиться к
                      фитнес-трекеру
                    </Text>
                    <TouchableOpacity style={[s.connection, styles.center]} >
                      <ImageBackground
                        style={s.connection}
                        source={require('./Images/bgButton.png')}>
                        <Text style={s.connectionText}>Подключить</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={s.Title}>Статистика</Text>
                <View style={[styles.spaceBetween, {marginTop: 8}]}>
                  <View style={[s.blockDescr, {marginRight: 4}]}>
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 9,
                        paddingVertical: 24,
                      }}>
                      <View style={[styles.spaceBetween, {paddingRight: 16}]}>
                        <SvgXml xml={icons.geo} />
                        <View style={s.textBlock}>
                          <Text style={s.progressText}>
                            <Text
                              style={[
                                s.progressText,
                                styles.white,
                                {fontWeight: '700'},
                              ]}>
                              {user.progress}
                            </Text>
                            /12
                          </Text>
                        </View>
                      </View>
                      <Text style={s.blockTitle}>Прогресс</Text>
                      <Text style={s.blockText}>
                        Выполняйте задания и повышейте свой уровень
                      </Text>
                    </View>
                    <View style={s.progressWrapper}>
                      {emptyArray.map((v, i) => (
                        <View
                          key={Math.random() + i}
                          style={[
                            s.progress,
                            i < user.progress ? s.processActive : {},
                          ]}></View>
                      ))}
                    </View>
                  </View>
                  <View style={s.blockDescr}>
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 9,
                        paddingVertical: 24,
                      }}>
                      <View style={[styles.spaceBetween, {paddingRight: 16}]}>
                        <SvgXml xml={icons.geo} />
                        <View style={s.textBlock}>
                          <Text style={s.progressText}>
                            <Text
                              style={[
                                s.progressText,
                                styles.white,
                                {fontWeight: '700'},
                              ]}>
                              {user.energy}
                            </Text>
                            /12
                          </Text>
                        </View>
                      </View>
                      <Text style={s.blockTitle}>Энергия</Text>
                      <Text style={s.blockText}>
                        Выполняйте задания и повышейте свой уровень
                      </Text>
                    </View>
                    <View style={s.progressWrapper}>
                      {emptyArray.map((v, i) => (
                        <View
                          key={Math.random() + i}
                          style={[
                            s.progress,
                            i < user.energy ? s.processActive : {},
                          ]}></View>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={[s.referalBlock, {marginTop: 4}]}>
                  <Text style={[s.Title, {marginVertical: 18, marginLeft: 24}]}>
                    Реферальная программа
                  </Text>
                  <View style={s.referalBottomBlock}>
                    <View style={s.usersSvg}>
                      <SvgXml xml={icons.users} />
                    </View>
                    <View>
                      <Text style={s.usersText}>Кол-во участников</Text>
                      <TouchableOpacity>
                        <Text style={s.refText}>Реферальная ссылка</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={s.allUsers}>
                      <Text style={s.allUsersText}>{user.invited}</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>

              <View style={styles.lastrowlarge}></View>
              <View style={styles.lastrowlarge}></View>
              <View style={styles.lastrowlarge}></View>
            </ScrollView>
          </View>
        )}
      </Template>
      <BottomSheet
          ref={searchDevice}
          index={-1}
          snapPoints={[500]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: radius}}
          handleComponent={null}
          enablePanDownToClose={true}
          // onChange={e => {
          //   e === -1
          //     ? this.setState({isSearchDevices: false, peripherals: []})
          //     : null;
          // }}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
              {/* <SearchDevice
                peripherals={peripherals}
                errorConnect={this.stateerrorConnect}
                BleManagerEmitter={BleManagerEmitter}
              /> */}
        </BottomSheet>
    </>
  );
};
const radius = 36;
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  settings: {
    position: 'absolute',
    top: 32,
    right: 16,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 32,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    marginTop: 24,
    ...styles.white,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
  },
  personalData: {
    marginTop: 2,
    ...styles.center,
  },
  personalDataText: {
    color: '#5B5B5B',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 32,
    marginRight: 4,
  },
  blockDescr: {
    backgroundColor: '#242424',
    borderRadius: radius,
    width: '50%',
    overflow: 'hidden',
  },
  blockTitle: {
    marginTop: 16,
    marginBottom: 8,
    ...styles.white,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  blockText: {
    color: '#5b5b5b',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    maxWidth: 153,
  },
  blockBottom: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  detail: {
    backgroundColor: '#A03BEF',
    padding: 12,
    borderRadius: 30,
  },
  Title: {
    textTransform: 'uppercase',
    color: '#5B5B5B',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    marginLeft: 16,
    marginTop: 24,
  },
  isWatch: {
    borderRadius: radius,
    backgroundColor: '#242424',
    marginTop: 8,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  treckerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  treckerTitle: {
    ...styles.white,
    marginTop: 32,
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 26,
  },
  treckerText: {
    flex: 3,
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  connection: {
    flex: 2,
    borderRadius: 20,
    padding: 12,
    overflow: 'hidden',
  },
  connectionText: {
    ...styles.white,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -6,
  },
  progress: {
    width: 17,
    height: 36,
    marginRight: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  processActive: {
    backgroundColor: '#A03BEF',
  },
  textBlock: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#313131',
    borderRadius: 12,
  },
  progressText: {
    color: 'rgba(255,255,255, 0.5)',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
  },
  referalBlock: {
    borderRadius: radius,
    backgroundColor: '#212121',
    overflow: 'hidden',
  },
  referalBottomBlock: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#242424',
    flexDirection: 'row',
    alignItems: 'center',
  },
  usersSvg: {
    ...styles.center,
    padding: 12,
    backgroundColor: '#313131',
    borderRadius: 50,
    marginRight: 16,
  },
  allUsers: {
    ...styles.center,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#A03BEF',
    borderRadius: 20,
    marginLeft: 'auto',
  },
  allUsersText: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  usersText: {
    ...styles.white,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 24,
  },
  refText: {
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
  },
});
