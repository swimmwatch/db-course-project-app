import * as React from "react";
import PropTypes from "prop-types";
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
    component: PropTypes.elementType.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default PrivateRoute;