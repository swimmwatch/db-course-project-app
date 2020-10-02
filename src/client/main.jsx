import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";

import App from "./apps/main/App";
import { store, initAuthStore } from "./store";

initAuthStore(store).then(() => {
    // TODO: Close loader

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
});
