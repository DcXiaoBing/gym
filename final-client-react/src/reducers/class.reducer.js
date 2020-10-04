import { FETCH_CALSS_BY_DATE, FETCH_FUTHURE_CLASSES } from "../actions/class.action";

export default function(state = null, action) {
  let res;
  switch(action.type) {
    case FETCH_CALSS_BY_DATE:
      res = action.payload.data;
      console.log("classes", res);
      if(res && res.success) {
        return res.data;
      }
      return state;
    default:
      return state;
  }
}