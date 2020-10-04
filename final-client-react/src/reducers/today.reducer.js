import { FETCH_TODAY_ORDER } from "../actions/today.action";

export default function(state = [], action) {
  let res;
  switch (action.type) {
    case FETCH_TODAY_ORDER:
      res = action.payload.data;
      if(res.success) {
        return res.data;  
      }
      return state;
    default:
      return state;
  }
}