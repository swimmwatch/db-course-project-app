export const LOGIN_APPROVE = 'LOGIN_APPROVE';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const success = user => {
    return { type: LOGIN_APPROVE, user, isLoggedIn: true };
};

export const failed = () => {
    return { type: LOGIN_FAILED, user: null, isLoggedIn: false };
};

export const logOut = () => {
    return { type: LOGOUT, user: null, isLoggedIn: false };
};