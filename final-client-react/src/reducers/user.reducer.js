import {FETCH_USER_INFO, UPDATE_USER_INFO} from "../actions/user.action";

export default function (state = null, action) {
    let res;
    switch(action.type) {
        case FETCH_USER_INFO:
            res = action.payload.data;
            console.log(res);
            if (res && res.success) {
                return res.data;
            } else {
                return null;
            }
        case UPDATE_USER_INFO:
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