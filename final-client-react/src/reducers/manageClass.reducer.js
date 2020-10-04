import { FETCH_FUTHURE_CLASSES, ADD_CLASS, EDIT_CLASS, DELETE_CLASS } from "../actions/manageClass.action"

export default function (state = [], action) {
  let res;
  switch (action.type) {
    case FETCH_FUTHURE_CLASSES:
      res = action.payload.data;
      console.log("future", res);
      if (res.success) {
        return res.data;
      }
      return state;
    case ADD_CLASS:
      res = action.payload.data;
      if (res.success) {
        state.push(res.data);
      }
      return [...state];
    case EDIT_CLASS:
      res = action.payload.data;
      if (res.success) {
        let idx = state.findIndex((elem) => elem.id === res.data.id);
        state.splice(idx, 1, res.data);
      }
      return [...state];
    case DELETE_CLASS:
      res = action.payload.data;
      if(res.success) {
        let idx = state.findIndex((elem) => elem.id === res.data);
        state.splice(idx, 1);
      }
      return [...state];
    default:
      return state;
  }
}