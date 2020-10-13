export function appendAuth(headers, token) {
    headers.append('Authorization', token);

    return headers;
}

export function appendJSON(headers) {
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
}