// combine reducers
// specify reducer -> relation

import {combineReducers} from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import orderReducer from "./order.reducer";
import classReducer from "./class.reducer";
import scheduleReducer from "./schedule.reducer";
import todayReducer from "./today.reducer";
import manageClassReducer from "./manageClass.reducer";

const rootReducer = combineReducers({
    // name of data(also the name which this reducer responsible for): reference to reducer
    user: authReducer,
    userDetail: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    classes: classReducer,
    scheduledClasses: scheduleReducer,
    todayOrders: todayReducer,
    manageClasses: manageClassReducer
})

export default rootReducer;