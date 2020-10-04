import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_SCHEDULED_CLASS = "FETCH_SCHEDULED_CLASS";
export const CANCEL_SCHEDULED_CLASS = "FETCH_SCHEDULED_CLASS";

export function fetchScheduledClass() {
  const promise = axios.get(`${API_URL}/classes/register`, {withCredentials: true});

  return {
    type: FETCH_SCHEDULED_CLASS,
    payload: promise
  }
}

export function cancelScheduledClass(course) {
  const promise = axios.post(`${API_URL}/classes/edit-register/${course.id}`,  course,{withCredentials: true});

  return {
    type: CANCEL_SCHEDULED_CLASS,
    payload: promise
  }
}
