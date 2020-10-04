import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css" // use bootstrap, web pack
import 'react-calendar/dist/Calendar.css';


import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import reduxPromise from "redux-promise";
import rootReducer from "./reducers/root.reducer";

const store = createStore(rootReducer, applyMiddleware(reduxPromise));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
