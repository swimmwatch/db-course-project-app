import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { toggleLoader } from "./helpers/loader";

import App from "./apps/contest/App";
import { store, initAuthStore } from "./store";
import history from "./history";

import "bootstrap/scss/bootstrap.scss";

initAuthStore(store).then(() => {
    toggleLoader();

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
        document.getElementById("root")
    );
});
