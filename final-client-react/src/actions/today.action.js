import axios from "axios"
import {getTodayDate} from "../utils/tools"

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_TODAY_ORDER = "FETCH_TODAY_ORDER";

export function fetchTodayOrder() {
  const promise = axios.get(`${API_URL}/orders/${getTodayDate().getTime()}`, {withCredentials: true});

  return {
    type: FETCH_TODAY_ORDER,
    payload: promise
  }
}