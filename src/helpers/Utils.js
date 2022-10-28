/*
 * (c) pavit.design, 2022
 */

const phoneNormalize = (phone, codeRemove = false) => {
  if (!empty(phone)) {
    phone = phoneClear(phone);
    if (!empty(phone)) phone = phone.length < 10 ? '' : phone;
    if (!empty(phone)) phone = '7' + phone.slice(1);
    if (!empty(phone) && codeRemove) phone = phone.slice(1);
  }
  return phone || null;
};

const phoneClear = phone => {
  if (!empty(phone)) {
    phone = phone.replace(/\s+/gi, '');
    phone = phone.replace(/-/gi, '');
    phone = phone.replace(/\(/gi, '');
    phone = phone.replace(/\)/gi, '');
    phone = phone.replace(/\+/gi, '');
    phone = phone.replace(/[^\d]+/gi, '');
  }
  return phone || null;
};

const phoneFormatter = phone =>
  empty(phone)
    ? phone
    : phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');

const empty = text =>
  text == null ||
  text === undefined ||
  text == '' ||
  text.toString().trim() == '';

const moneyFormat = amount =>
  amount ? amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d)\.?)/g, '$1 ') : 0;

const emailCheck = email =>
  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);

export {
  phoneNormalize,
  phoneFormatter,
  phoneClear,
  empty,
  moneyFormat,
  emailCheck,
};
