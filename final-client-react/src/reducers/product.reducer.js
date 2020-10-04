import {FETCH_PRODUCTS} from "../actions/product.action";

export default function (state = [], action) {
  let res;
  switch (action.type) {
    case FETCH_PRODUCTS:
      res = action.payload.data;
      if(res.success) {
        console.log(res.data);
        // make sure it is sorted by id
        res.data.sort((a, b) => a.id - b.id);
        return res.data;
      }
      return state; // fail
  
    default:
      return state;
  }
}