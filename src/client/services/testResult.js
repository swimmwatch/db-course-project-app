import {getToken} from "../helpers/token";
import {appendAuth} from "../helpers/header";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";

/**
 * Get attempt results
 * @param {number} attemptId - Attempt ID
 * @return {Promise<unknown>}
 */
export const init = async attemptId => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    // create url
    const url = `/api/test/result?id=${attemptId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    let responseJson = null;
    try {
        responseJson = await response.json();
    } catch (err) {
        // handle case if json is invalid
        throw [{
            status: INTERNAL_SERVER_ERROR,
            message: 'something went wrong'
        }];
    }

    if (response.ok) {
        const { userAnswers } = responseJson;

        return Promise.resolve(userAnswers);
    } else {
        throw responseJson;
    }
};