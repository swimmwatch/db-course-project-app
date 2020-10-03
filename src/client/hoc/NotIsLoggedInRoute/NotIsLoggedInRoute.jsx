import * as React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const NotIsLoggedInRoute = ({ component: Component, isLoggedIn, ...rest }) => {
    return (
        <Route { ...rest } render={() => (
            !isLoggedIn ? (
                <Component />
            ) : (
                <Redirect to="/" />
            )
        )} />
    );
};

NotIsLoggedInRoute.propTypes = {
    isLoggedIn: PropType.bool,
    component: PropType.elementType,
};

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;

    return { isLoggedIn };
}

export default connect(mapStateToProps)(NotIsLoggedInRoute);