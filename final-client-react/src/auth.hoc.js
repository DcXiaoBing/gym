import { connect } from "react-redux";

import React from "react";
export default function auth(ExistingComponent) {
    
    // TODO: try function based hoc
    class WrapperComponent extends React.Component {

        state = {}; // can init state here. Equal to use constructor

        static getDerivedStateFromProps(props, state) {
            if(!props.isLoggedIn) {
                props.history.push("/home");
            }
            return null; // not change state
        }

        render() {
            // wrapper component pass props(received from parent) to existing component
            return <ExistingComponent {...this.props} />
        }
    }

    // return 一个 class.
    return connect(({isLoggedIn}) => ({isLoggedIn}))(WrapperComponent); 
}
