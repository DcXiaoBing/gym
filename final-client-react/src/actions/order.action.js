import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_ORDERS = "FETCH_ORDERS";

export function fetchOrders(callback) {
  const promise = axios.get(`${API_URL}/orders`, {withCredentials: true}).then((res) => {
    if(res && res.success) {
      if(callback) callback(res);
    }
    return res;
  });

  return {
    type: FETCH_ORDERS,
    payload: promise
  }
}