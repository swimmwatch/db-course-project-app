import {getToken} from "../helpers/token";
import {appendAuth} from "../helpers/header";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";

/**
 * Get own attempts
 * @return {Promise<Object[]>}
 */
export const getOwnAttempts = async () => {
    const token = getToken();
    const headers = new Headers();

    appendAuth(headers, token);

    // create url
    const url = `/api/attempt/profile`;

    const response = await fetch(url, {
        method: 'GET',
        headers
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
        return Promise.resolve(responseJson);
    } else {
        throw responseJson;
    }
}