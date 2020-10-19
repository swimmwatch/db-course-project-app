import { createStore } from "redux";
import rootReducer from "../reducers";
import * as authActions from "../actions/auth";
import {getToken} from "../helpers/token";
import {appendAuth} from "../helpers/header";
import history from "../history";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const initAuthStore = async (store) => {
    const token = getToken();

    if (!token) {
        store.dispatch(authActions.failed());
    } else {
        let response = null;
        try {
            const headers = new Headers();

            appendAuth(headers, token);

            response = await fetch('/api/init', { headers, method: 'POST' });
        } catch (err) {
            store.dispatch(authActions.logOut());
        }

        if (response.ok) {
            const responseJson = await response.json();
            const { user } = responseJson;

            store.dispatch(authActions.success(user));
        } else {
            store.dispatch(authActions.logOut());

            history.push('/login');
        }
    }
};

export default store;