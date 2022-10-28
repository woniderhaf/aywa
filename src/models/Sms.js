/*
 * (c) pavit.design, 2021
 */

// helpers
import {Http} from '../helpers/Index';

const restore = async phone => await Http.post(`sms/${phone}/restore`);
const check = async (phone, code) =>
  await Http.post(`sms/${phone}/restore/check`, {code});
const smsDelete = async phone => {
  await Http.post(`sms/${phone}/delete`);
};
export {restore, check, smsDelete};
