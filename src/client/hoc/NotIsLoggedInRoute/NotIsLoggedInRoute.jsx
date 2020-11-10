import * as React from "react";
import PropType from "prop-types";
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
    isLoggedIn: PropType.bool.isRequired,
    component: PropType.elementType.isRequired,
};

export default NotIsLoggedInRoute;