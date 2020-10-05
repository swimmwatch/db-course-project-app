import {BAD_REQUEST, FORBIDDEN} from "http-status-codes";
import {createHeaderWithAuth} from "../helpers/header";

const remove = async () => {
    const token = localStorage.getItem("TOKEN");
    const headers = createHeaderWithAuth(token);
    const response = await fetch("/api/profile/remove", { headers, method: 'POST' });

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
    const token = localStorage.getItem("TOKEN");
    const headers = createHeaderWithAuth(token);

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