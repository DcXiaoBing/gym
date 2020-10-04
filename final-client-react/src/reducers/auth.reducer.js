import { LOGIN, LOGOUT, CHECKLOGIN } from '../actions/auth.action';

export default function (state = null, action) {
    let res;
    switch (action.type) {
        case CHECKLOGIN:
            res = action.payload.data;
            if (res && res.success) {
                return res.data;
            } else {
                return null;
            }
        case LOGIN:
            res = action.payload.data;
            if (res && res.success) {
                return res.data; // user
            } else {
                return null;
            }
        case LOGOUT:
            res = action.payload.data;
            console.log(action.payload);
            if (res && res.success) {
                return null;
            } else {
                return state;
            }
        default:
            return state;
    }
}