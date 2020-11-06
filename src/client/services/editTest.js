import {appendAuth, appendJSON} from "../helpers/header";
import {getToken} from "../helpers/token";

/**
 *
 * @param {number} testId - Test ID
 * @return {Promise<void>}
 */
export const deleteTest = async testId => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);
    appendJSON(headers);

    await fetch(`/api/test/delete`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ testId })
    });
};

/**
 * Get own tests for profile viewing
 * @return {Promise<Object[]>}
 */
export const getOwnTests = async () => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    const response  = await fetch('/api/test/profile', {
        method: 'GET',
        headers
    });

    const responseJson = await response.json();

    return Promise.resolve(responseJson);
};

/**
 * Create test
 * @param {Object} testData - Test data
 * @param {Object} testData.info - Test title
 * @param {string} testData.info.title - Test title
 * @param {string} testData.info.description - Test description
 * @param {Object[]} testData.questions - Questions
 * @param {string} testData.questions[].title - Question title
 * @param {string} testData.questions[].typeAnswer - Question type
 * @param {Object[]} testData.questions[].answers - Answers
 * @param {string} testData.questions[].answers[].content - Answer content
 * @param {boolean} testData.questions[].answers[].isRight - Answer status
 * @return Promise<Object|void>
 */
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

/**
 *
 * @param {number} testId - Test ID
 * @return {Promise<Object[]>}
 */
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
