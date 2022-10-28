/*
 * (c) pavit.design, 2022
 */

// globals
import {API} from '../globals/Сonstants';

const get = async (controller, data) => await request(controller, 'GET', data);
const post = async (controller, data) =>
  await request(controller, 'POST', data);
const put = async (controller, data) => await request(controller, 'PUT', data);
const remove = async (controller, data) =>
  await request(controller, 'DELETE', data);

const request = async (controller, method, data) => {
  const url = `${API.url}${controller}`;
  const options = {
    method,
    headers: new Headers({
      Authentication: API.key,
      'Content-Type': 'application/json;charset=utf-8',
    }),
    body: data == null ? null : JSON.stringify(data),
  };
  const response = await fetch(url, options).catch(ex => {
    console.log('error response:', ex);
    throw {status: 500};
  });
  if (response === undefined) return null;
  if (response.status === 200) {
    // console.log({response});
    const json = await response.json();
    // console.log({json});
    return json;
  }
  const error = await response.json();
  console.log('error:', response);
  console.log('error response:', error);
  let duplicate = false;
  try {
    duplicate = error.message.errorInfo[1] === 1062;
  } catch (ex) {}
  throw {status: response.status, duplicate};
};

export {get, post, put, remove, request};
