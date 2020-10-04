import { FETCH_SCHEDULED_CLASS, CANCEL_SCHEDULED_CLASS } from "../actions/schedule.action";

export default function(state = [], action) {
  let res;
  switch(action.type) {
    case FETCH_SCHEDULED_CLASS:
      res = action.payload.data;
      if(res.success) {
        return res.data;
      }
      return state;
    case CANCEL_SCHEDULED_CLASS:
      res = action.payload.data;
      if(res.success) {
        let idx = state.findIndex((elem) => elem.id === res.data.id);
        state.splice(idx, 1);
      }
      return [...state];
    default:
      return state;
  }
}