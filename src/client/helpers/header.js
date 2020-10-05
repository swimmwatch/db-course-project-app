export function createHeaderWithAuth(token) {
    const headers = new Headers();
    headers.append('Authorization', token);

    return headers;
}