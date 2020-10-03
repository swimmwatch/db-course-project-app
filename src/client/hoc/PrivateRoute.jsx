import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
    return (
        <Route { ...rest } render={() => (
            !isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <Component />
            )
        )}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.element,
    isLoggedIn: PropTypes.bool
};

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;

    return { isLoggedIn };
}

export default connect(mapStateToProps)(PrivateRoute);

