import {appendAuth} from "../helpers/header";
import {getToken} from "../helpers/token";
import {INTERNAL_SERVER_ERROR, NOT_FOUND} from "http-status-codes";

/**
 * Get test for passing
 * @param {number} testId - Test ID
 * @return {Promise<unknown>}
 */
export const init = async testId => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    // create url
    const url = `/api/test/pass?id=${testId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers
    });

    let responseJson = null;
    try {
        responseJson = await response.json();
    } catch (err) {
        // handle case if json is invalid
        throw {
            status: INTERNAL_SERVER_ERROR,
            message: 'something went wrong'
        };
    }

    if (response.ok) {
        return Promise.resolve(responseJson);
    } else {
        switch (response.status) {
            case NOT_FOUND: {
                throw {
                    status: NOT_FOUND,
                    message: 'test not found'
                };
            }
            default: {
                // TODO: handle default case

                console.log('something went wrong');
            }
        }
    }
};