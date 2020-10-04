import { FETCH_ORDERS } from "../actions/order.action";

export default function(state = [], action) {
  let res;
  switch(action.type) {
    case FETCH_ORDERS:
      res = action.payload.data;
      console.log(res);
      if(res && res.success) {
        return res.data;
      } else {
        return state;
      }
    default:
      return state;
  }
}