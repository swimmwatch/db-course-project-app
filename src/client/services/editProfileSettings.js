import {FORBIDDEN} from "http-status-codes";
import {headerWithAuth} from "../helpers/header";

const remove = async () => {
    const token = localStorage.getItem("TOKEN");
    const headers = headerWithAuth(token);
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

export { remove };