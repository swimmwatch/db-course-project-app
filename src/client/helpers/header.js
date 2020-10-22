/**
 * Add to HTTP header 'Authorization' field
 * @param {Headers} headers
 * @param {string} token
 * @return {Headers}
 */
export function appendAuth(headers, token) {
    headers.append('Authorization', token);

    return headers;
}

/**
 * Add to HTTP headers for working with JSON
 * @param {Headers} headers
 * @return {Headers}
 */
export function appendJSON(headers) {
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
}