/*
 * (c) pavit.design, 2021
 */

// helpers
import {Http} from '../helpers/Index';

const get = async id => await Http.get(`user/${id}`);

const login = async data => await Http.post('user/auth', data);

const register = {
  prepare: async data => await Http.post('user/register/prepare', data),
  save: async data => await Http.post('user/register', data),
  finish: async (id, code) => await Http.post(`user/${id}/activate`, {code}),
};

const restore = {
  prepare: async phone => await Http.post(`user/${phone}/restore`),
  check: async (phone, code) =>
    await Http.post(`user/${phone}/restore/check`, {code}),
  finish: async (id, password) =>
    await Http.put(`user/${id}/restore/changepassword`, {password}),
};

const update = async params => {
  await Http.put(`user/${params.id}`, params.data);
};
const nicknamePrepare = async data =>
  await Http.post(`user/nickname/prepare`, data);

const passwordPrepare = async data =>
  await Http.post(`user/${data.id}/changepassword/prepare`, {
    password: data.password,
  });
export {
  get,
  login,
  register,
  restore,
  update,
  nicknamePrepare,
  passwordPrepare,
};
