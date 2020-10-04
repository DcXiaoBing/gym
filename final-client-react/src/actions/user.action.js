/**
 * fetch user info by using cookie
 */

import axios from 'axios';

// https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
// axios.get('some api url', {withCredentials: true});

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export function fetchUserInfo(callback) {
    // get do not need data
    const promise = axios.get(`${API_URL}/user-detail`, { withCredentials: true })
        .then(res => {
            if (res && callback) {
                callback(res);
            }
            return res;
        });
    return {
        type: FETCH_USER_INFO,
        payload: promise
    }
}

export function updateUserDetail(userDetail, callback) {
    const promise = axios.put(`${API_URL}/user-detail`, userDetail, { withCredentials: true })
        .then(res => {
            if (callback && res) {
                callback(res);
            }
            return res;
        });
    return {
        type: UPDATE_USER_INFO,
        payload: promise
    }
}