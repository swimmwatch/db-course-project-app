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
