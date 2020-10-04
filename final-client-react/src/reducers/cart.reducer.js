import { ADD_PRODUCT_TO_CART, SET_PRODUCT_COUNT, EMPTY_CART, CANCEL_ITEM, PLACE_ORDER } from "../actions/cart.action";

export default function(state = [], action) {
  let idx;
  let res;
  switch(action.type) {
    case ADD_PRODUCT_TO_CART:
      idx = state.findIndex((elem) => {
        return elem.product.id === action.payload.id;
      });
      if(idx >= 0) {
        state[idx].quantity++;
      } else {
        state.push({quantity: 1, product: action.payload});
      }
      return [...state];
    case SET_PRODUCT_COUNT:
      // if(state.length === 1) return [];
      idx = state.findIndex((elem) => {
        return elem.product.id === action.payload.id;
      });

      // must delete then add, so view will update
      state.splice(idx, 1, {product: action.payload.product, quantity: action.payload.quantity})
      return [...state];
    case CANCEL_ITEM:
      idx = state.findIndex((elem) => {
        return elem.product.id === action.payload.id;
      });
      state.splice(idx, 1);
      return [...state];
    case EMPTY_CART:
      return [];

    case PLACE_ORDER:
      console.log(action.payload);
      res = action.payload.data;
      if(res && res.success) {
        return []; // empty cart
      } else {
        return state; // do nothing
      }
    default:
      return state;
  }

}