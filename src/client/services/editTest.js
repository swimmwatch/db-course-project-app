import {createHeaderWithAuth} from "../helpers/header";

export const deleteTest = async testId => {
    const token = localStorage.getItem('TOKEN');
    const headers = createHeaderWithAuth(token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`/api/test/delete`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ testId })
    });

    if (response.ok) {
        return Promise.resolve();
    } else {
        // TODO: handle if something went wrong
        return Promise.reject();
    }
};

export const getOwnTests = async () => {
    const token = localStorage.getItem('TOKEN');
    const headers = createHeaderWithAuth(token);

    const response  = await fetch('/api/test/profile', {
        method: 'GET',
        headers
    });

    if (response.ok) {
        const responseJson = await response.json();

        return Promise.resolve(responseJson);
    } else {
        // TODO: handle if something wrong
        return Promise.reject();
    }
};
