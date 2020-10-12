import {removeToken} from "../helpers/token";

async function signUp(formData) {
    const response = await fetch("/api/signup", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        return Promise.resolve();
    } else {
        throw await response.json();
    }
}

async function signIn(formData) {
    const response = await fetch("/api/signin", {
        method: "POST",
        body: formData
    });

    const responseJson = await response.json();

    if (response.ok) {
        return Promise.resolve(responseJson);
    } else {
        throw responseJson;
    }
}

export function logOut() {
    removeToken();
}

export default {
    signUp,
    signIn,
    logOut
};