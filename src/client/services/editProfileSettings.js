import {BAD_REQUEST, FORBIDDEN} from "http-status-codes";
import {appendAuth} from "../helpers/header";
import {getToken} from "../helpers/token";

const remove = async () => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    const response = await fetch("/api/profile/remove", {
        headers,
        method: 'POST'
    });

    if (response.ok) {
        return Promise.resolve();
    } else {
        switch (response.status) {
            case FORBIDDEN:
                return Promise.reject();
            default:
                break;
        }
    }
};

const updatePassword = async (formData) => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(token);

    const response = await fetch("/api/profile/update-password", {
        method: 'POST',
        headers,
        body: formData
    });

    if (response.ok) {
        return Promise.resolve(null);
    } else {
        const responseJson = await response.json();

        switch (response.status) {
            case BAD_REQUEST:
                return Promise.reject(responseJson);
            default:
                break;
        }
    }
};

export { remove, updatePassword };