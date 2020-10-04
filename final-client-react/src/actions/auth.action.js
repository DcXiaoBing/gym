import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECKLOGIN = "CHECKLOGIN";

export function checkLogin(callback) {
  const promise = axios.get(`${API_URL}/check-login`, { withCredentials: true })
    .then(res => {
      console.log(res);
      if (callback && res) {
        callback(res);
      }
      return res;
    }, res => {
      if(callback && res) {
        callback(res);
      }
    });
  return {
    type: CHECKLOGIN,
    payload: promise
  };
}

export function login(user, callback, fail) {
  const promise = axios.post(`${API_URL}/login`, qs.stringify(user), { withCredentials: true })
    .then(res => {
      console.log(res);
      if (callback) {
        callback(res);
      }
      return res;
    }, res => {
      fail();
      return res;
    });
  return {
    type: LOGIN,
    payload: promise
  }
}

export function logout(callback) {
  const promise = axios.post(`${API_URL}/logout`, null, { withCredentials: true })
    .then(res => {
      console.log(res);
      if (callback) {
        callback(res);
      }
      return res;
    });
  return {
    type: LOGOUT,
    payload: promise
  }
}