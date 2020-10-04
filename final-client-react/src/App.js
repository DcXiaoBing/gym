import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container"

import Header from "./components/user/Header"
import Home from "./components/user/Home"
import Login from "./components/Login";
import Signup from "./components/user/Signup";
import Pricing from "./components/user/Pricings";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/purchase/Checkout";
import UserCenter from "./components/user/UserCenter";
import { checkLogin } from "./actions/auth.action";
import Location from "./components/user/Location";
import StickyFooter from "./components/Footer";
import Classes from "./components/user/Classes";
import Dashboard from "./components/admin/Dashboard";

function RenderUserPage(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Container maxWidth="xl">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/classes" component={Classes} />
            <Route path="/training" component={Home} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/user-center" component={UserCenter} />
            <Route path="/location" component={Location}/>
            <Route path="/cart" component={Cart} />
            <Route path="/dashboard" component={Dashboard} />

            {/* all mismatch go to home */}
            <Route path="*" component={Home} />
          </Switch>
        </Container>
        <StickyFooter />
      </BrowserRouter>
    </React.Fragment>
  );
}

function App(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    
    // get something before
    if (user === null) {
      dispatch(checkLogin());
    }
  }, [user, dispatch]);

  return <RenderUserPage />
}

export default App;
