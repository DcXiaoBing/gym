import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(callback) {
  const promise = axios.get(`${API_URL}/products`, {withCredentials: true}).then(
    (res) => {
      if(res && callback) {
        callback(res);
      }
      return res;
    }
  );
  return {
    type: FETCH_PRODUCTS,
    payload: promise
  }
}
