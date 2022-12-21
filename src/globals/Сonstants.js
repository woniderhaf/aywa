/*
 * (c) pavit.design, 2022
 */

const isDevelopeMode = __DEV__ ? true : false;
const url = isDevelopeMode
  ? 'http://95.161.194.246:8070'
  : 'https://aywa.pavit.ru';

export const API = {
  url: `${url}/api/`,
  assets: `${url}/assets/`,
  key: '',
  pushKey: 'df718918-2d47-4dc5-a033-f52be4745135',
  version: '1.0.1',
};
export const rarity = [
  'Обычный',
  'Необычный',
  'Редкий',
  'Епический',
  'Легендарный',
];
// при создании нфт в бд редкость указывается от 0 до 4 где соответственно 0-обычный 1-необычный 2-редкий 3-епический 4-легендарный

export const MAPS = {
  key: 'AIzaSyCpENlGSW-VAx9UPhMFaBMLNJsPwtLh3gU',
  map_id: '2dc4f981b3699931',
  urlGeoCodes: (latitude, longitude) =>
    `https://maps.googleapis.com/maps/api/geocode/json?language=ru&address=${latitude},${longitude}&key=${MAPS.key}`,
  urlGeoCodesAdr: address =>
    `https://maps.googleapis.com/maps/api/geocode/json?language=ru&address=${address}&key=${MAPS.key}`,
  urlDirections: (origin, destination) =>
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.join(
      ',',
    )}&destination=${destination.join(',')}&key=${MAPS.key}`,
  urlStatic: (latitude, longitude, width, height, zoom) =>
    `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${
      zoom || 15
    }&size=${width}x${height}&map_id=${MAPS.map_id}&key=${MAPS.key}`,
  deltas: {
    latitude: 0.009,
    longitude: 0.009,
  },
  defaultCoordinates: {
    latitude: 55.799858,
    longitude: 49.105206,
  },
};

export const notificationStatus = {
  UNKNOWN: 0,
  ACCEPT: 1,
  DECLINE: 2,
};
export const notificationStatusName = ['запрошен', 'принят', 'отклонен'];
