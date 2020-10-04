import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const FETCH_FUTHURE_CLASSES = "FETCH_FUTHURE_CLASSES";
export const ADD_CLASS = "ADD_CLASS";
export const EDIT_CLASS = "EDIT_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";

export function addClass(course) {
  const promise = axios.post(`${API_URL}/classes`, course, {withCredentials: true});

  return {
    type: ADD_CLASS,
    payload: promise
  }
}

export function editClass(course) {
  const promise = axios.put(`${API_URL}/classes`, course, {withCredentials: true});
  return {
    type: EDIT_CLASS,
    payload: promise
  }
}

export function deleteClass(course) {
  const promise = axios.delete(`${API_URL}/classes/${course.id}`, {withCredentials: true});

  return {
    type: DELETE_CLASS,
    payload: promise
  }
}

export function fetchFuthureClasses(timestamp) {
  const promise = axios.get(`${API_URL}/classes/future/${timestamp}`);

  return {
    type: FETCH_FUTHURE_CLASSES,
    payload: promise
  }
}
