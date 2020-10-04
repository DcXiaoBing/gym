import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_CALSS_BY_DATE = "FETCH_CLASSES_BY_DATE";
export const REGISTER_CLASS = "REGISTER_CLASS";

export function fetchClasses(timestamp) {
  const promise = axios.get(`${API_URL}/classes/${timestamp}`);
  console.log(new Date(timestamp));
  return {
    type: FETCH_CALSS_BY_DATE,
    payload: promise
  }
}


export function registerClass(course) {
  const promise = axios.post(`${API_URL}/classes/register`, course, {withCredentials: true}).then((res) => {
    alert(res.data.message);
  });
  return {
    type: REGISTER_CLASS,
    payload: promise
  }
}

