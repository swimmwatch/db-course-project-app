import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toggleLoader } from "./helpers/loader";

import App from "./apps/main/App";
import { store, initAuthStore } from "./store";
import history from "./history";

import "bootstrap/scss/bootstrap.scss";

initAuthStore(store).then(() => {
    toggleLoader();

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
});
