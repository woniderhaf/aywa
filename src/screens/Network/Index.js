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
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/ru';

// components
import Template from '../../components/Template';

// models
import {User} from '../../models/Index';

// helpers
import {App, Storage, Utils} from '../../helpers/Index';

// globals
import {MAPS} from '../../globals/Сonstants';

// styles
import styles from '../../styles/Styles';

// map style
const mapstyle = [
  {elementType: 'geometry', stylers: [{color: '#212121'}]},
  {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#757575'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#212121'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}],
  },
  {featureType: 'administrative.land_parcel', stylers: [{visibility: 'off'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#bdbdbd'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#181818'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#1b1b1b'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#2c2c2c'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8a8a8a'}],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#373737'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#3c3c3c'}],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#4e4e4e'}],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#000000'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#3d3d3d'}],
  },
];

// icons
const icons = {
  filter:
    '<svg width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.25C4.03379 3.25 3.25 4.03379 3.25 5V7.586C3.25 8.04833 3.43293 8.49493 3.7633 8.82396L3.76409 8.82474L8.75 13.8107V19.749C8.75 21.0497 9.97222 22.0049 11.2347 21.6897L11.2349 21.6896L13.7349 21.0646C14.6245 20.8422 15.25 20.0424 15.25 19.124V13.8107L20.2373 8.82333C20.566 8.49464 20.75 8.04985 20.75 7.586V5C20.75 4.03379 19.9662 3.25 19 3.25H5ZM13.9648 12.9746C13.8953 13.0453 13.8427 13.1265 13.8069 13.2129C13.7702 13.3013 13.75 13.3983 13.75 13.5V19.124C13.75 19.3536 13.5935 19.5538 13.3711 19.6094L10.8713 20.2343C10.5558 20.3131 10.25 20.0743 10.25 19.749V13.5C10.25 13.3983 10.2298 13.3013 10.1931 13.2129C10.1568 13.1251 10.103 13.0428 10.0319 12.9713C10.0314 12.9707 10.0309 12.9702 10.0303 12.9697M10.03 12.9694L4.82333 7.76267L4.82191 7.76126C4.77678 7.71636 4.75 7.6533 4.75 7.586V5C4.75 4.86221 4.86221 4.75 5 4.75H19C19.1378 4.75 19.25 4.86221 19.25 5V7.586C19.25 7.65215 19.224 7.71536 19.1767 7.76267L13.9702 12.9692L13.9697 12.9697" fill="url(#paint0_linear_261_10370)"/><defs><linearGradient id="paint0_linear_261_10370" x1="-5.5" y1="-41.4589" x2="14.9721" y2="32.7172" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
  filteractive:
    '<svg width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.25C4.03379 3.25 3.25 4.03379 3.25 5V7.586C3.25 8.04833 3.43293 8.49493 3.7633 8.82396L3.76409 8.82474L8.75 13.8107V19.749C8.75 21.0497 9.97222 22.0049 11.2347 21.6897L11.2349 21.6896L13.7349 21.0646C14.6245 20.8422 15.25 20.0424 15.25 19.124V13.8107L20.2373 8.82333C20.566 8.49464 20.75 8.04985 20.75 7.586V5C20.75 4.03379 19.9662 3.25 19 3.25H5ZM13.9648 12.9746C13.8953 13.0453 13.8427 13.1265 13.8069 13.2129C13.7702 13.3013 13.75 13.3983 13.75 13.5V19.124C13.75 19.3536 13.5935 19.5538 13.3711 19.6094L10.8713 20.2343C10.5558 20.3131 10.25 20.0743 10.25 19.749V13.5C10.25 13.3983 10.2298 13.3013 10.1931 13.2129C10.1568 13.1251 10.103 13.0428 10.0319 12.9713C10.0314 12.9707 10.0309 12.9702 10.0303 12.9697M10.03 12.9694L4.82333 7.76267L4.82191 7.76126C4.77678 7.71636 4.75 7.6533 4.75 7.586V5C4.75 4.86221 4.86221 4.75 5 4.75H19C19.1378 4.75 19.25 4.86221 19.25 5V7.586C19.25 7.65215 19.224 7.71536 19.1767 7.76267L13.9702 12.9692L13.9697 12.9697" fill="url(#paint0_linear_261_10490)"/><circle cx="18" cy="5" r="3" fill="#00FE00" stroke="#090909" stroke-width="2"/><defs><linearGradient id="paint0_linear_261_10490" x1="-5.5" y1="-41.4589" x2="14.9721" y2="32.7172" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
  back: '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M14 8L10 12L14 16" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M17.3025 6.71094L6.70301 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82362 6.7227L17.304 6.69513L17.2764 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  map: {
    filter:
      '<svg width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.25C4.03379 3.25 3.25 4.03379 3.25 5V7.586C3.25 8.04833 3.43293 8.49493 3.7633 8.82396L3.76409 8.82474L8.75 13.8107V19.749C8.75 21.0497 9.97222 22.0049 11.2347 21.6897L11.2349 21.6896L13.7349 21.0646C14.6245 20.8422 15.25 20.0424 15.25 19.124V13.8107L20.2373 8.82333C20.566 8.49464 20.75 8.04985 20.75 7.586V5C20.75 4.03379 19.9662 3.25 19 3.25H5ZM13.9648 12.9746C13.8953 13.0453 13.8427 13.1265 13.8069 13.2129C13.7702 13.3013 13.75 13.3983 13.75 13.5V19.124C13.75 19.3536 13.5935 19.5538 13.3711 19.6094L10.8713 20.2343C10.5558 20.3131 10.25 20.0743 10.25 19.749V13.5C10.25 13.3983 10.2298 13.3013 10.1931 13.2129C10.1568 13.1251 10.103 13.0428 10.0319 12.9713C10.0314 12.9707 10.0309 12.9702 10.0303 12.9697M10.03 12.9694L4.82333 7.76267L4.82191 7.76126C4.77678 7.71636 4.75 7.6533 4.75 7.586V5C4.75 4.86221 4.86221 4.75 5 4.75H19C19.1378 4.75 19.25 4.86221 19.25 5V7.586C19.25 7.65215 19.224 7.71536 19.1767 7.76267L13.9702 12.9692L13.9697 12.9697" fill="white"/></svg>',
    plus: '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M8.45752 16H23.5425" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8.45753V23.5425" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    minus:
      '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M8.45752 16H23.5425" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    location:
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12.25 23L21 3L1 11.75L10.34 13.6475L12.25 23Z" fill="#A03BEF"/></svg>',
    marker:
      '<svg width="48" height="51" viewBox="0 0 48 51"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 36.2339 9.15371 46.3299 20.9857 47.8125C22.106 47.9529 23 48.871 23 50C23 50.5523 23.4477 51 24 51C24.5523 51 25 50.5523 25 50C25 48.871 25.894 47.9529 27.0143 47.8125C38.8463 46.3299 48 36.2339 48 24C48 10.7452 37.2548 0 24 0Z" fill="white"/></svg>',
  },
  check: {
    on: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#A03BEF"/><path d="M8.44397 12.339L10.611 14.506L10.597 14.492L15.486 9.60303" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    off: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#5B5B5B"/></svg>',
  },
  contacts: {
    phone:
      '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="22" fill="#313131"/><path d="M30.7021 30.9626L31.5607 30.104C31.842 29.8227 32 29.4412 32 29.0433C32 28.6455 31.842 28.264 31.5607 27.9827L29.6433 26.0653C29.4576 25.8796 29.2371 25.7323 28.9945 25.6318C28.7518 25.5313 28.4917 25.4796 28.2291 25.4796C27.9665 25.4796 27.7064 25.5313 27.4637 25.6318C27.2211 25.7323 27.0006 25.8796 26.8149 26.0653L25.3118 27.5684C24.1961 27.1523 23.1828 26.5012 22.3408 25.6592C21.4988 24.8172 20.8477 23.8039 20.4316 22.6882L21.9346 21.1851C22.3097 20.81 22.5204 20.3013 22.5204 19.7709C22.5204 19.2405 22.3097 18.7318 21.9346 18.3567L20.0173 16.4393C19.878 16.3001 19.7127 16.1896 19.5307 16.1142C19.3487 16.0388 19.1536 16 18.9566 16C18.7597 16 18.5646 16.0388 18.3826 16.1142C18.2006 16.1896 18.0353 16.3001 17.896 16.4393L17.0374 17.2979C16.3739 17.9614 16.0008 18.861 16 19.7993V19.7993C15.9986 21.4019 16.3132 22.9891 16.9259 24.47C17.5385 25.9508 18.4372 27.2964 19.5704 28.4296C20.7036 29.5628 22.0491 30.4614 23.53 31.0741C25.0109 31.6867 26.598 32.0014 28.2006 32V32C29.1389 31.9992 30.0386 31.6261 30.7021 30.9626Z" stroke="#CA86FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    email:
      '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 19.0195C15.75 18.3287 16.3092 17.7695 17 17.7695H31C31.6908 17.7695 32.25 18.3287 32.25 19.0195V28.9825C32.25 29.6721 31.691 30.2315 31 30.2315H17C16.3092 30.2315 15.75 29.6723 15.75 28.9815V19.0195ZM17 31.7315H31C32.519 31.7315 33.75 30.501 33.75 28.9825V19.0195C33.75 17.5003 32.5192 16.2695 31 16.2695H17C15.4808 16.2695 14.25 17.5003 14.25 19.0195V28.9815C14.25 30.5007 15.4808 31.7315 17 31.7315ZM19.3859 20.3569C19.0307 20.1438 18.57 20.2589 18.3569 20.6141C18.1438 20.9693 18.2589 21.43 18.6141 21.6431L23.6141 24.6431C23.8516 24.7856 24.1484 24.7856 24.3859 24.6431L29.3859 21.6431C29.7411 21.43 29.8562 20.9693 29.6431 20.6141C29.43 20.2589 28.9693 20.1438 28.6141 20.3569L24 23.1254L19.3859 20.3569Z" fill="#CA86FF"/></svg>',
    telegram:
      '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M32.8779 17.437C32.8596 17.6195 32.8038 17.8699 32.7304 18.1708L29.786 31.3612C29.5334 32.5348 28.1531 33.0591 27.1857 32.3442L23.8616 29.8885L22.2531 31.4533C21.493 32.1922 20.219 31.8661 19.9105 30.8497L18.6497 26.6989L14.9506 25.5448C13.8084 25.1877 13.7504 23.5876 14.8715 23.1546L14.8728 23.1541L31.2285 16.8009L31.2306 16.8001C31.3008 16.773 31.3701 16.7328 31.4643 16.6737L31.4799 16.6638L31.4799 16.6638C31.5182 16.6396 31.5767 16.6027 31.6296 16.5736L31.6341 16.5711L31.6341 16.5711C31.6757 16.548 31.8394 16.457 32.0475 16.448C32.1846 16.4421 32.3732 16.4698 32.5499 16.5983C32.7208 16.7224 32.8015 16.8836 32.8388 16.9952C32.902 17.1843 32.8851 17.3652 32.8779 17.437ZM19.7872 25.5759C19.8695 25.6595 19.9333 25.7637 19.9698 25.8838L21.3058 30.2822L22.6389 28.9852L21.8083 28.3716C20.9989 27.7748 20.9338 26.5838 21.6851 25.906C22.3492 25.3064 23.3283 24.4228 24.1414 23.689L25.6019 22.3711C25.9086 22.0944 26.381 22.1179 26.6588 22.4229C26.6596 22.4237 26.6604 22.4246 26.6612 22.4255C26.9387 22.7331 26.9139 23.2077 26.6063 23.4852L25.1463 24.8026C24.3331 25.5365 23.3536 26.4205 22.6896 27.0199C22.6473 27.0581 22.6487 27.1276 22.699 27.1647L24.224 28.2913C24.2348 28.2989 24.2455 28.3067 24.2559 28.3149L28.0772 31.1378C28.1666 31.2039 28.2961 31.1563 28.3198 31.0449L28.3214 31.0376L30.9088 19.4466L31.1317 18.4477L16.035 24.3118L19.4747 25.385C19.5974 25.4233 19.7032 25.4901 19.7872 25.5759Z" fill="#CA86FF"/></svg>',
    whatsapp:
      '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="22" fill="#313131"/><path d="M30.2041 17.7611C28.5581 16.1141 26.3691 15.2061 24.0371 15.2051C19.2301 15.2051 15.3191 19.1141 15.3181 23.9191C15.3161 25.4481 15.7171 26.9511 16.4811 28.2761L15.2441 32.7921L19.8661 31.5801C21.1451 32.2761 22.5771 32.6411 24.0331 32.6411H24.0371C28.8421 32.6411 32.7531 28.7311 32.7551 23.9261C32.7561 21.5981 31.8501 19.4091 30.2041 17.7611Z" stroke="#CA86FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.3511 27.4813L27.7803 27.052C27.921 26.9114 28 26.7206 28 26.5217C28 26.3228 27.921 26.132 27.7803 25.9913L26.8217 25.0327C26.7288 24.9398 26.6186 24.8662 26.4972 24.8159C26.3759 24.7656 26.2459 24.7398 26.1146 24.7398C25.9832 24.7398 25.8532 24.7656 25.7319 24.8159C25.6105 24.8662 25.5003 24.9398 25.4074 25.0327L24.6559 25.7842C24.098 25.5762 23.5914 25.2506 23.1704 24.8296C22.7494 24.4086 22.4238 23.902 22.2158 23.3441L22.9673 22.5925C23.1548 22.405 23.2602 22.1507 23.2602 21.8854C23.2602 21.6202 23.1548 21.3659 22.9673 21.1783L22.0087 20.2197C21.939 20.15 21.8563 20.0948 21.7653 20.0571C21.6743 20.0194 21.5768 20 21.4783 20C21.3798 20 21.2823 20.0194 21.1913 20.0571C21.1003 20.0948 21.0176 20.15 20.948 20.2197L20.5187 20.6489C20.187 20.9807 20.0004 21.4305 20 21.8997V21.8997C19.9993 22.701 20.1566 23.4945 20.4629 24.235C20.7693 24.9754 21.2186 25.6482 21.7852 26.2148C22.3518 26.7814 23.0246 27.2307 23.765 27.537C24.5054 27.8434 25.299 28.0007 26.1003 28V28C26.5695 27.9996 27.0193 27.813 27.3511 27.4813Z" stroke="#CA86FF" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    instagram:
      '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.496 15.75C17.4263 15.75 15.75 17.4271 15.75 19.496V28.504C15.75 30.5737 17.4271 32.25 19.496 32.25H28.504C30.5738 32.25 32.25 30.5728 32.25 28.505V19.496C32.25 17.4262 30.5728 15.75 28.505 15.75H19.496ZM19.496 14.25C16.5977 14.25 14.25 16.5989 14.25 19.496V28.504C14.25 31.4023 16.5989 33.75 19.496 33.75H28.504C31.4022 33.75 33.75 31.4012 33.75 28.505V19.496C33.75 16.5978 31.4012 14.25 28.505 14.25H19.496ZM28.9453 17.9629L28.9493 17.9629C29.5462 17.9629 30.0395 18.4458 30.0373 19.0529C30.0362 19.6522 29.5499 20.1379 28.9503 20.1379C28.353 20.1379 27.8623 19.654 27.8623 19.0509C27.8623 18.4499 28.349 17.9661 28.9453 17.9629ZM29.3623 19.0509H30.0373L30.0373 19.0529L30.0373 19.0549L29.3623 19.0513V19.0509ZM29.3623 19.0509C29.3623 18.8198 29.1756 18.6379 28.9503 18.6379L28.9493 18.6379L28.9489 18.6379C28.7227 18.6386 28.5395 18.821 28.5373 19.0469L28.5373 19.0489L28.5373 19.0509C28.5382 19.283 28.7271 19.4629 28.9493 19.4629V19.0509V19.0491V18.7129L28.9503 18.8991L28.9511 19.0491L28.9511 19.0509L28.9533 19.4629C29.1775 19.4617 29.3621 19.2801 29.3623 19.0513L29.2873 19.0509H29.3623ZM21.9851 21.9851C23.0981 20.8721 24.9027 20.8721 26.0156 21.9851C27.1286 23.0981 27.1286 24.9027 26.0156 26.0156C24.9027 27.1286 23.0981 27.1286 21.9851 26.0156C20.8721 24.9027 20.8721 23.0981 21.9851 21.9851ZM20.9245 20.9245C22.6233 19.2257 25.3775 19.2257 27.0763 20.9245C28.7751 22.6233 28.7751 25.3775 27.0763 27.0763C25.3775 28.7751 22.6233 28.7751 20.9245 27.0763C19.2257 25.3775 19.2257 22.6233 20.9245 20.9245Z" fill="#CA86FF"/></svg>',
  },
  location:
    '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M8.83301 14.6673L14.6663 1.33398L1.33301 7.16732L7.55967 8.43232L8.83301 14.6673Z" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  notfound:
    '<svg width="48" height="48" viewBox="0 0 48 48"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 14C15 10.134 18.134 7 22 7C25.866 7 29 10.134 29 14C29 17.866 25.866 21 22 21C18.134 21 15 17.866 15 14ZM22 5C17.0294 5 13 9.02944 13 14C13 18.9706 17.0294 23 22 23C26.9706 23 31 18.9706 31 14C31 9.02944 26.9706 5 22 5ZM14 29C11.6131 29 9.32387 29.9482 7.63604 31.636C5.94821 33.3239 5 35.6131 5 38V40C5 40.5523 5.44772 41 6 41C6.55228 41 7 40.5523 7 40V38C7 36.1435 7.7375 34.363 9.05025 33.0503C10.363 31.7375 12.1435 31 14 31H22C22.5523 31 23 30.5523 23 30C23 29.4477 22.5523 29 22 29H14ZM34.889 27C31.5139 27 28.7778 29.736 28.7778 33.1111C28.7778 34.7879 29.4532 36.307 30.5467 37.4112C30.5538 37.4179 30.5607 37.4246 30.5677 37.4316C30.5746 37.4385 30.5815 37.4456 30.5882 37.4527C31.6924 38.5466 33.2118 39.2222 34.889 39.2222C38.264 39.2222 41.0001 36.4862 41.0001 33.1111C41.0001 29.736 38.264 27 34.889 27ZM29.9037 39.5098C31.279 40.5829 33.0093 41.2222 34.889 41.2222C39.3686 41.2222 43.0001 37.5908 43.0001 33.1111C43.0001 28.6315 39.3686 25 34.889 25C30.4093 25 26.7778 28.6315 26.7778 33.1111C26.7778 34.9903 27.4169 36.7203 28.4895 38.0955L25.2929 41.2921C24.9024 41.6827 24.9024 42.3158 25.2929 42.7063C25.6834 43.0969 26.3166 43.0969 26.7071 42.7063L29.9037 39.5098ZM33.7071 30.2929C33.3166 29.9024 32.6834 29.9024 32.2929 30.2929C31.9024 30.6834 31.9024 31.3166 32.2929 31.7071L33.5858 33L32.2929 34.2929C31.9024 34.6834 31.9024 35.3166 32.2929 35.7071C32.6834 36.0976 33.3166 36.0976 33.7071 35.7071L35 34.4142L36.2929 35.7071C36.6834 36.0976 37.3166 36.0976 37.7071 35.7071C38.0976 35.3166 38.0976 34.6834 37.7071 34.2929L36.4142 33L37.7071 31.7071C38.0976 31.3166 38.0976 30.6834 37.7071 30.2929C37.3166 29.9024 36.6834 29.9024 36.2929 30.2929L35 31.5858L33.7071 30.2929Z" fill="url(#paint0_linear_261_10607)"/><defs><linearGradient id="paint0_linear_261_10607" x1="-14" y1="-86.8315" x2="26.0737" y2="66.6687" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
};

// vars
const list = [
  {
    id: 1,
    name: 'Соколова Валерия',
    nick: 'sokol',
    coords: {latitude: 55.826539725942105, longitude: 49.1034459467446},
    img: 'https://harpersbazaar.kz/wp-content/uploads/2019/09/4-48.jpg',
  },
  {
    id: 2,
    name: 'Нечаев Дмитрий',
    nick: 'dmit',
    coords: {latitude: 55.82646051389637, longitude: 49.09849675413691},
    img: 'https://files.pravda-nn.ru/2021/06/609782c8be66d87a1bd3c04a-1900x.jpg',
  },
  {
    id: 3,
    name: 'Коняхина Анна',
    nick: 'anna',
    coords: {latitude: 55.81842794787894, longitude: 49.10449942779002},
    img: 'https://m.spletnik.ru/img/2014/11/yunna/20141103-fem-1.jpg',
  },
  {
    id: 4,
    name: 'Редькин Вова',
    nick: 'vova',
    coords: {latitude: 55.8168818576083, longitude: 49.13450256910249},
    img: 'https://n1s1.elle.ru/b4/22/05/b4220547cc9284354a0615d442406c49/728x546_1_8ebf9fc7d9abd6dc934095ecfbe237a0@1016x762_0xc35dbb80_10169127321522236626.jpg',
  },
  {
    id: 5,
    name: 'Протасова Анна',
    nick: 'anna',
    coords: {latitude: 55.82768594358093, longitude: 49.14832439877935},
  },
  {
    id: 6,
    name: 'Давтян Арман',
    nick: 'arman',
    coords: {latitude: 55.79979143464919, longitude: 49.1512473470813},
    img: 'https://muz-tv.ru/storage/images/uploaded/a83eB94XdD77zRRlQLpZRMbwm0Dcy1ol1hgmUNWe.jpeg',
  },
  {
    id: 7,
    name: 'Тюпина Екатерина',
    nick: 'kate',
    coords: {latitude: 55.786681226034865, longitude: 49.12366775328662},
  },
  {
    id: 8,
    name: 'Выскребенцев Михаил',
    nick: 'popup',
    coords: {latitude: 55.79215181449268, longitude: 49.10149835195815},
    img: 'https://img-fotki.yandex.ru/get/370155/127908635.1ee3/0_1e351f_f2eeea9e_orig.jpg',
  },
  {
    id: 9,
    name: 'Константинов Константин',
    nick: 'kosta',
    coords: {latitude: 55.79009017988183, longitude: 49.227366598578996},
  },
  {
    id: 10,
    name: 'Максимкин Кирилл',
    nick: 'red',
    coords: {latitude: 55.77759399545206, longitude: 49.12712558042356},
    img: 'https://icdn.lenta.ru/images/2022/02/09/17/20220209175029375/square_320_5f7ca1a85e9e4e96a51ae4792d32c6c1.jpg',
  },
  {
    id: 11,
    name: 'Филипп Шаповалов',
    nick: 'fill',
    coords: {latitude: 55.8286150911787, longitude: 49.1031598372481},
    img: 'https://i.discogs.com/ugwsLJPfPH4fiZ8Du_2rlA-ScOW_XC0g381Ji-3Mrgk/rs:fit/g:sm/q:90/h:741/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1Mjc5/My0xNTY0ODIwOTQx/LTEwODMuanBlZw.jpeg',
  },
];
const income = [
  {id: 1, from: 50000, to: 100000},
  {id: 2, from: 100000, to: 250000},
  {id: 3, from: 250000, to: 0},
];
const interests = [
  {id: 1, name: 'Книги'},
  {id: 2, name: 'Спорт'},
  {id: 3, name: 'Путешествия'},
  {id: 4, name: 'Автомобили'},
  {id: 5, name: 'Изотерика'},
  {id: 6, name: 'Музыка'},
  {id: 7, name: 'Компьютерные игры'},
  {id: 8, name: 'Театр'},
];
const developed = [
  {id: 1, name: 'Информационные технологии'},
  {id: 2, name: 'Математика'},
  {id: 3, name: 'Искусство'},
  {id: 4, name: 'Музыка'},
];

// start
export default class NetworkScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: null,
      region: null,
      contact: null,
      tab: 1,
      filters: {
        income: null,
        interests: null,
        developed: null,
      },
      isempty: false,
      ismap: false,
      iscontact: false,
      isincome: false,
      isinterests: false,
      isdeveloped: false,
      forbidden: false,
      loading: true,
    };
  }
  panel = null;
  componentDidMount = async () => {
    App.prepare(this.props.navigation, async user => {
      const region = {
        latitude: MAPS.defaultCoordinates.latitude,
        longitude: MAPS.defaultCoordinates.longitude,
        latitudeDelta: MAPS.deltas.latitude,
        longitudeDelta: MAPS.deltas.longitude,
      };
      this.locationGet();
      this.setState({user, region, loading: false}, () => {
        if (this.map) this.map.animateToRegion(region, 200);
      });
    });
  };
  locationGet = callback => {
    if (this.state.forbidden) {
      Alert.alert(
        'Внимание!',
        'Вы запретили доступ к определению местоположения',
        [
          {text: 'Отмена', style: 'cancel'},
          {
            text: 'Настройки',
            onPress: async () => await Linking.openSettings(),
          },
        ],
      );
      return;
    }
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        const {region} = this.state;
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: region.latitudeDelta || MAPS.deltas.latitude,
            longitudeDelta: region.longitudeDelta || MAPS.deltas.longitude,
          },
        });
        if (this.map) this.map.animateToRegion(this.state.region, 200);
        if (callback) callback();
      },
      error => {
        console.log('current location error', error);
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Местоположение',
              message: 'Вы сможете видеть информацию об объектах около вас.',
            },
          ).then(res => this.setState({forbidden: res !== 'granted'}));
        } else this.setState({forbidden: true});
        this.setState({loading: false}, () => (callback ? callback() : {}));
      },
      Platform.OS === 'android' ? {timeout: 15000} : {enableHighAccuracy: true},
    );
  };
  regionChange = region => this.setState({region});
  filter = () => {};
  tabSet = tab => this.setState({tab, ismap: tab === 2});
  tabsShow = () => (
    <View style={s.tabs}>
      <TouchableOpacity
        style={[s.tab, this.state.tab === 1 ? s.tabactive : null]}
        onPress={() => this.tabSet(1)}>
        <Text style={[styles.text, styles.middle, styles.bold]}>Список</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.tab, this.state.tab === 2 ? s.tabactive : null]}
        onPress={() => this.tabSet(2)}>
        <Text style={[styles.text, styles.middle, styles.bold]}>Карта</Text>
      </TouchableOpacity>
    </View>
  );
  markerSelect = contact => {
    if (this.state.contact?.id === contact.id) {
      this.setState({iscontact: true}, () => this.panelShow());
      return;
    }
    this.setState({contact});
  };
  contactSelect = contact =>
    this.setState({contact, iscontact: true}, () => this.panelShow());
  markerShow = contact => (
    <>
      <SvgXml xml={icons.map.marker} />
      <Image source={{uri: contact.img}} style={s.baloonavatar} />
      <View style={s.marker}></View>
    </>
  );
  zoom = isin => {
    const region = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: this.state.region.latitudeDelta * (isin ? 0.5 : 2),
      longitudeDelta: this.state.region.longitudeDelta / 2,
    };
    this.setState({region});
    if (this.map) this.map.animateToRegion(region, 200);
  };
  panelShow = () => this.panel.snapToIndex(0);
  panelHide = () => this.panel.close();
  filterClear = () => {
    this.filterUnset();
    this.panelHide();
  };
  filterIncomeShow = () =>
    this.setState({isincome: true, isinterests: false, isdeveloped: false});
  filterInterestsShow = () =>
    this.setState({isincome: false, isinterests: true, isdeveloped: false});
  filterDevelopedShow = () =>
    this.setState({isincome: false, isinterests: false, isdeveloped: true});
  filterUnset = () =>
    this.setState({isincome: false, isinterests: false, isdeveloped: false});
  filterIncomeSet = income =>
    this.setState({filters: {...this.state.filters, income}});
  filterInterestsSet = interests =>
    this.setState({filters: {...this.state.filters, interests}});
  filterDevelopedSet = developed =>
    this.setState({filters: {...this.state.filters, developed}});
  filterShow = () => this.setState({iscontact: false}, this.panelShow);
  filterApply = () => this.panelHide();

  contact = type => {
    const {contacts} = this.state.contact;
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${contacts.phone}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${contacts.email}`);
        break;
      case 'telegram':
        Linking.openURL(`https://t.me/${contacts.telegram}`);
        break;
      case 'whatsapp':
        Linking.openURL(`https://wa.me/${contacts.phone}`);
        break;
      case 'instagram':
        Linking.openURL(contacts.instagram);
        break;
    }
  };

  mapStaticGet = () =>
    MAPS.urlStatic(
      this.state.contact.coords.latitude,
      this.state.contact.coords.longitude,
      width,
      240,
      17,
    );

  render() {
    return (
      <>
        {this.state.ismap ? (
          <Template
            styles={styles}
            page={'Network'}
            navigation={this.props.navigation}
            isheader={false}
            loading={this.state.loading}>
            {this.state.region ? (
              <>
                <MapView
                  ref={map => (this.map = map)}
                  provider={PROVIDER_GOOGLE}
                  style={s.map}
                  customMapStyle={mapstyle}
                  initialRegion={this.state.region}
                  onRegionChangeComplete={this.regionChange}>
                  {list.map((v, i) => (
                    <Marker
                      key={i}
                      style={s.baloon}
                      coordinate={{
                        latitude: v.coords.latitude,
                        longitude: v.coords.longitude,
                      }}
                      onPress={() => this.markerSelect(v)}>
                      {this.state.contact?.id === v.id ? (
                        this.markerShow(v)
                      ) : this.state.region &&
                        this.state.region.longitudeDelta > 0.012 ? (
                        <View style={[s.marker, s.markersigle]}></View>
                      ) : (
                        this.markerShow(v)
                      )}
                    </Marker>
                  ))}
                </MapView>
                <View style={s.mapcontrols}>
                  <TouchableOpacity
                    style={s.controls}
                    onPress={this.filterShow}>
                    <SvgXml xml={icons.map.filter} />
                  </TouchableOpacity>
                  <View style={[s.controls, s.plusminis]}>
                    <TouchableOpacity
                      style={s.plusminisplus}
                      onPress={() => this.zoom(true)}>
                      <SvgXml xml={icons.map.plus} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.plusminisminus}
                      onPress={() => this.zoom(false)}>
                      <SvgXml xml={icons.map.minus} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={s.controls}
                    onPress={() => this.locationGet()}>
                    <SvgXml xml={icons.map.location} />
                  </TouchableOpacity>
                </View>
                {this.tabsShow()}
              </>
            ) : null}
          </Template>
        ) : (
          <Template
            title={'Нетворкинг'}
            styles={styles}
            page={'Network'}
            navigation={this.props.navigation}
            isheader={true}
            loading={this.state.loading}
            headerContext={
              <TouchableOpacity onPress={() => this.filterShow()}>
                <SvgXml
                  xml={
                    this.state.isempty || this.state.data?.length
                      ? icons.filteractive
                      : icons.filter
                  }
                />
              </TouchableOpacity>
            }>
            {this.state.loading ? null : this.state.isempty ? (
              <View style={s.containerempty}>
                <SvgXml xml={icons.notfound} />
                <Text
                  style={[
                    styles.text,
                    styles.bold,
                    styles.center,
                    styles.mt20,
                  ]}>
                  Никто не найден, измените параметры поиска
                </Text>
                {this.tabsShow()}
              </View>
            ) : (
              <View style={s.container}>
                <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
                  {list.map((v, i) => (
                    <TouchableOpacity
                      key={i}
                      style={s.row}
                      onPress={() => this.contactSelect(v)}>
                      {v.img ? (
                        <Image source={{uri: v.img}} style={s.avatar} />
                      ) : (
                        <View style={s.avatar}></View>
                      )}
                      <View style={s.name}>
                        <Text style={[styles.text, styles.bold]}>{v.name}</Text>
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.normal,
                            styles.brownlight,
                            styles.mt5,
                          ]}>
                          @{v.nick}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <View style={s.lastrowlarge}></View>
                </ScrollView>
                {this.tabsShow()}
              </View>
            )}
          </Template>
        )}
        <BottomSheet
          ref={r => (this.panel = r)}
          index={-1}
          snapPoints={[
            this.state.iscontact ? height - (marginTop ? 40 : 30) : 480,
          ]}
          backgroundStyle={{backgroundColor: 'trasparent'}}
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
          {this.state.iscontact ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={s.panel}>
                <View style={s.panelhandle}></View>
                <View style={[s.panelheader, s.panelcenter]}>
                  {this.state.contact.img ? (
                    <Image
                      source={{uri: this.state.contact.img}}
                      style={s.avatarbig}
                    />
                  ) : (
                    <View style={s.avatarbig}></View>
                  )}
                  <Text style={[styles.text, styles.title, styles.center]}>
                    {this.state.contact.name}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      styles.normal,
                      styles.brownlight,
                      styles.mt5,
                    ]}>
                    @{this.state.contact.nick}
                  </Text>
                  <View style={s.contactpanel}>
                    <TouchableOpacity onPress={() => this.contact('phone')}>
                      <SvgXml xml={icons.contacts.phone} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.contact('email')}>
                      <SvgXml xml={icons.contacts.email} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.contact('telegram')}>
                      <SvgXml xml={icons.contacts.telegram} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.contact('whatsapp')}>
                      <SvgXml xml={icons.contacts.whatsapp} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.contact('instagram')}>
                      <SvgXml xml={icons.contacts.instagram} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={s.panelcontent}>
                  <View style={s.panelrow}>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.normal,
                        styles.brownlight,
                      ]}>
                      Доход
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.boldlight,
                        styles.right,
                      ]}>
                      ₽ {Utils.moneyFormat(50000, false)} –{' '}
                      {Utils.moneyFormat(100000, false)}
                    </Text>
                  </View>
                  <View style={s.panelrow}>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.normal,
                        styles.brownlight,
                      ]}>
                      Интересы
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.boldlight,
                        styles.right,
                        s.panelrowinfo,
                      ]}
                      numberOfLines={2}>
                      {['Книги', 'спорт', 'путешествия'].join(', ')}
                    </Text>
                  </View>
                  <View style={[s.panelrow, s.panelrowlast]}>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.normal,
                        styles.brownlight,
                      ]}>
                      Сфера развития
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        styles.middle,
                        styles.boldlight,
                        styles.right,
                        s.panelrowinfo,
                      ]}
                      numberOfLines={2}>
                      {['Информационные технологии', 'Искусство'].join(', ')}
                    </Text>
                  </View>
                </View>
                <View style={s.panelcontentmap}>
                  <Image
                    source={{uri: this.mapStaticGet()}}
                    style={s.staticmap}
                  />
                  <View style={s.baloonstatic}>
                    <SvgXml xml={icons.map.marker} />
                    <Image
                      source={{uri: this.state.contact.img}}
                      style={s.baloonavatar}
                    />
                    <View style={s.marker}></View>
                  </View>
                  <View style={s.panelstaticcontrol}>
                    <TouchableOpacity
                      style={[styles.button, s.buttonsmall]}
                      onPress={() => {}}>
                      <Text style={[styles.text, styles.middle, styles.bold]}>
                        Показать на карте
                      </Text>
                    </TouchableOpacity>
                    <View style={s.distance}>
                      <SvgXml xml={icons.location} />
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.normal,
                          styles.brownlight,
                          styles.ml10,
                        ]}>
                        2.5 км
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={s.panelbuttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.panelHide()}>
                    <Text style={[styles.text, styles.bold]}>Закрыть</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : (
            <>
              {this.state.isincome ? (
                <View style={s.panel}>
                  <View style={s.panelhandle}></View>
                  <View style={s.panelheader}>
                    <Text style={[styles.text, styles.title, styles.center]}>
                      Доход
                    </Text>
                    <TouchableOpacity
                      style={s.panelheaderback}
                      onPress={() => this.filterUnset()}>
                      <SvgXml xml={icons.back} />
                    </TouchableOpacity>
                  </View>
                  <View style={s.panelcontent}>
                    {income.map((v, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          s.panelrow,
                          s.panelrowleft,
                          income.length - 1 === i ? s.panelrowlastlist : null,
                        ]}
                        onPress={() => this.filterIncomeSet(v)}>
                        <SvgXml
                          xml={
                            this.state.filters.income?.id === v.id
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text style={[styles.text, styles.bold, styles.ml10]}>
                          {v.to === 0
                            ? `более ₽ ${Utils.moneyFormat(v.from, false)}`
                            : `₽ ${Utils.moneyFormat(
                                v.from,
                                false,
                              )} – ${Utils.moneyFormat(v.to, false)}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={s.panelbuttons}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.filterUnset()}>
                      <Text style={[styles.text, styles.bold]}>Выбрать</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              {this.state.isinterests ? (
                <View style={s.panel}>
                  <View style={s.panelhandle}></View>
                  <View style={s.panelheader}>
                    <Text style={[styles.text, styles.title, styles.center]}>
                      Интересы
                    </Text>
                    <TouchableOpacity
                      style={s.panelheaderback}
                      onPress={() => this.filterUnset()}>
                      <SvgXml xml={icons.back} />
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={s.panelcontent}>
                    {interests.map((v, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          s.panelrow,
                          s.panelrowleft,
                          interests.length - 1 === i
                            ? s.panelrowlastlist
                            : null,
                        ]}
                        onPress={() => this.filterInterestsSet(v)}>
                        <SvgXml
                          xml={
                            this.state.filters.interests?.id === v.id
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text style={[styles.text, styles.bold, styles.ml10]}>
                          {v.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={s.panelbuttons}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.filterUnset()}>
                      <Text style={[styles.text, styles.bold]}>Выбрать</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              {this.state.isdeveloped ? (
                <View style={s.panel}>
                  <View style={s.panelhandle}></View>
                  <View style={s.panelheader}>
                    <Text style={[styles.text, styles.title, styles.center]}>
                      Сфера развития
                    </Text>
                    <TouchableOpacity
                      style={s.panelheaderback}
                      onPress={() => this.filterUnset()}>
                      <SvgXml xml={icons.back} />
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={s.panelcontent}>
                    {developed.map((v, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          s.panelrow,
                          s.panelrowleft,
                          developed.length - 1 === i
                            ? s.panelrowlastlist
                            : null,
                        ]}
                        onPress={() => this.filterDevelopedSet(v)}>
                        <SvgXml
                          xml={
                            this.state.filters.developed?.id === v.id
                              ? icons.check.on
                              : icons.check.off
                          }
                        />
                        <Text style={[styles.text, styles.bold, styles.ml10]}>
                          {v.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={s.panelbuttons}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.filterUnset()}>
                      <Text style={[styles.text, styles.bold]}>Выбрать</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              {!this.state.isincome &&
              !this.state.isinterests &&
              !this.state.isdeveloped ? (
                <View style={s.panel}>
                  <View style={s.panelhandle}></View>
                  <View style={s.panelheader}>
                    <Text style={[styles.text, styles.title, styles.center]}>
                      Фильтр
                    </Text>
                  </View>
                  <View style={s.panelcontent}>
                    <TouchableOpacity
                      style={s.panelrow}
                      onPress={() => this.filterIncomeShow()}>
                      <View>
                        <Text style={[styles.text, styles.bold, styles.mb5]}>
                          Доход
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.normal,
                            styles.brownlight,
                          ]}>
                          ₽ {Utils.moneyFormat(50000, false)} –{' '}
                          {Utils.moneyFormat(100000, false)}
                        </Text>
                      </View>
                      <SvgXml xml={icons.next} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.panelrow}
                      onPress={() => this.filterInterestsShow()}>
                      <View>
                        <Text style={[styles.text, styles.bold, styles.mb5]}>
                          Интересы
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.normal,
                            styles.brownlight,
                          ]}>
                          {['Книги', 'спорт', 'путешествия'].join(', ')}
                        </Text>
                      </View>
                      <SvgXml xml={icons.next} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[s.panelrow, s.panelrowlast]}
                      onPress={() => this.filterDevelopedShow()}>
                      <View>
                        <Text
                          style={[styles.text, styles.bold, styles.mb5]}
                          numberOfLines={1}>
                          Сфера развития
                        </Text>
                        <Text
                          style={[
                            styles.text,
                            styles.middle,
                            styles.normal,
                            styles.brownlight,
                          ]}
                          numberOfLines={1}>
                          {['Информационные технологии', 'Искусство'].join(
                            ', ',
                          )}
                        </Text>
                      </View>
                      <SvgXml xml={icons.next} />
                    </TouchableOpacity>
                  </View>
                  <View style={s.panelbuttons}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttondisable, s.button]}
                      onPress={() => this.filterClear()}>
                      <Text style={[styles.text, styles.bold]}>Сбросить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, s.button]}
                      onPress={() => this.filterApply()}>
                      <Text style={[styles.text, styles.bold]}>Применить</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </>
          )}
        </BottomSheet>
      </>
    );
  }
}

const marginTop = styles.pbx.paddingBottom ? 20 : 0;
const radius = 36;
const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: styles.blacklight.color,
    marginHorizontal: 2,
    paddingHorizontal: 20,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  containerempty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: -100,
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: styles.violet.color,
    borderColor: styles.black.color,
    borderWidth: 3,
  },
  markersigle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  baloon: {
    alignItems: 'center',
  },
  baloonstatic: {
    position: 'absolute',
    top: 100 - 42,
    left: width / 2 - 21,
    alignItems: 'center',
  },
  baloonavatar: {
    position: 'absolute',
    top: 3,
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: styles.blacklight2.color,
    resizeMode: 'cover',
  },
  mapcontrols: {
    position: 'absolute',
    right: 10,
    top: 120,
  },
  controls: {
    width: 48,
    height: 48,
    marginBottom: 15,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styles.black.color,
  },
  plusminis: {
    height: 96,
    justifyContent: 'space-between',
  },
  plusminisplus: {
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  plusminisminus: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  tabs: {
    position: 'absolute',
    bottom: marginTop ? 120 : 100,
    alignSelf: 'center',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: styles.black.color,
  },
  tab: {
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  tabactive: {
    backgroundColor: styles.violet.color,
  },
  list: {
    width: width - 60,
    marginHorizontal: 30,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: styles.blacklight2.color,
    resizeMode: 'cover',
  },
  name: {
    width: width - 50 - 60 - 10 - 10,
    paddingVertical: 20,
    borderBottomColor: styles.brown.color,
    borderBottomWidth: 1,
  },
  lastrowlarge: {
    height: marginTop ? 220 : 200,
  },
  panel: {
    flex: 1,
  },
  panelhandle: {
    width: 32,
    height: 4,
    marginBottom: 10,
    backgroundColor: styles.brownlight.color,
    borderRadius: 5,
    alignSelf: 'center',
  },
  panelheader: {
    padding: 24,
    backgroundColor: styles.blacklight.color,
    borderRadius: radius,
  },
  panelcenter: {
    alignContent: 'center',
    alignItems: 'center',
  },
  panelheaderback: {
    position: 'absolute',
    top: 20,
    marginLeft: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelcontent: {
    flex: 1,
    marginTop: 4,
    paddingVertical: 24,
    paddingHorizontal: 32,
    backgroundColor: styles.blacklight.color,
    borderRadius: radius,
  },
  panelcontentmap: {
    flex: 1,
    marginTop: 4,
    backgroundColor: styles.blacklight.color,
    borderRadius: radius,
    overflow: 'hidden',
  },
  panelstaticcontrol: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: styles.black2.color,
    overflow: 'hidden',
  },
  staticmap: {
    width: width,
    height: 240,
  },
  buttonsmall: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: styles.violet.color,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: styles.brown.color,
    borderBottomWidth: 0.5,
  },
  panelrowleft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  panelrowlast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  panelrowlastlist: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 60,
  },
  panelrowinfo: {
    width: '60%',
  },
  panelbuttons: {
    paddingTop: 30,
    paddingBottom: marginTop ? 30 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: styles.black.color,
  },
  button: {
    width: '49%',
  },
  avatarbig: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 100,
    backgroundColor: styles.blacklight2.color,
    resizeMode: 'cover',
  },
  contactpanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
