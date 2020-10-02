import * as authActions from "../actions/auth";

let initState = { isLoggedIn: false, user: null }

export default (state = initState, action) => {
    const { isLoggedIn, user } = action;

    switch (action.type) {
        case authActions.LOGIN_APPROVE:
            return { isLoggedIn, user };
        case authActions.LOGIN_FAILED:
            return { isLoggedIn: false, user: null };
        case authActions.LOGOUT:
            return { isLoggedIn: false, user: null };
        default:
            return state;
    }
};