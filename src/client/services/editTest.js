import {appendAuth, appendJSON} from "../helpers/header";
import {getToken} from "../helpers/token";

export const deleteTest = async testId => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);
    appendJSON(headers);

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
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

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

export const create = async (testData) => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);
    appendJSON(headers);

    const response = await fetch('/api/test/create', {
        method: 'POST',
        body: JSON.stringify(testData),
        headers,
    });

    if (response.ok) {
        return Promise.resolve();
    } else {
        const responseJson = await response.json();

        return Promise.reject(responseJson);
    }
};

export const update = async (testData, testId) => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);
    appendJSON(headers);

    const response = await fetch('/api/test/update', {
        method: 'PUT',
        body: JSON.stringify({ ...testData, testId }),
        headers,
    });

    if (response.ok) {
        return Promise.resolve();
    } else {
        const responseJson = await response.json();

        return Promise.reject(responseJson);
    }
};

export const getTestForEdit = async testId => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);
    appendJSON(headers);

    const response = await fetch('/api/test/update', {
        method: 'POST',
        body: JSON.stringify({ testId }),
        headers,
    });

    const responseJson = await response.json();
    if (response.ok) {
        return Promise.resolve(responseJson);
    } else {
        return Promise.reject();
    }
};

/**
 * Get all tests
 * @return {Promise<Object[]>}
 */
export const getAllTests = async () => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    const response  = await fetch('/api/test/all', {
        method: 'GET',
        headers
    });

    const responseJson = await response.json();

    return Promise.resolve(responseJson);
};
