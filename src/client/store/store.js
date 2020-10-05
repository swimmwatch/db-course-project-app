import { createStore } from "redux";
import rootReducer from "../reducers";
import * as authActions from "../actions/auth";
import { createHeaderWithAuth } from "../helpers/header";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const initAuthStore = async (store) => {
    const token = localStorage.getItem('TOKEN');

    if (!token) {
        store.dispatch(authActions.failed());
    } else {
        let response = null;
        try {
            const headers = createHeaderWithAuth(token);
            response = await fetch('/api/init', { headers, method: 'POST' });
        } catch (err) {
            console.log(err);
        }

        if (response.ok) {
            const responseJson = await response.json();
            const { user } = responseJson;

            store.dispatch(authActions.success(user));
        } else {
            store.dispatch(authActions.failed());
        }
    }
};

export default store;