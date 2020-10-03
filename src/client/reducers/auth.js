import * as authActions from "../actions/auth";
import * as authService from "../services/auth";

let initState = { isLoggedIn: false, user: null }

export default (state = initState, action) => {
    const { isLoggedIn, user } = action;

    switch (action.type) {
        case authActions.LOGIN_APPROVE:
            return { isLoggedIn, user };
        case authActions.LOGIN_FAILED:
            return { isLoggedIn, user };
        case authActions.LOGOUT:
            authService.logOut();

            return { isLoggedIn, user };
        default:
            return state;
    }
};