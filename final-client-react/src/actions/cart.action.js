import axios from 'axios';

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const SET_PRODUCT_COUNT = "SET_PRODUCT_COUNT";
export const CANCEL_ITEM = "CANCEL_ITEM";
export const EMPTY_CART = "EMPTY_CART";
export const DELETE_A_PRODUCT = "DELETE_A_PRODUCT";
export const PLACE_ORDER = "PLACE_ORDER";

const API_URL = process.env.REACT_APP_API_URL;

export function addProduct(product) {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product
  }
}

export function setProductCount(product, qty) {
  return {
    type: SET_PRODUCT_COUNT,
    payload: {
      product: product,
      quantity: qty
    }
  }
}

export function cancelItem(product) {
  return {
    type: CANCEL_ITEM,
    payload: product
  }
}

export function emptyCart() {
  return {
    type: EMPTY_CART
  }
}

export function placeOrder(cart, callback) {
  console.log(cart);
  const promise = axios.post(`${API_URL}/orders`, {purchases: cart, purchase_date: new Date()}, { withCredentials: true })
    .then((res) => {
      console.log(res);
      if (res && res.success) {
        callback(res);
      }
      return res;
    });

  return {
    type: PLACE_ORDER,
    payload: promise
  }
}

