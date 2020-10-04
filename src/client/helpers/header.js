export function headerWithAuth(token) {
    const headers = new Headers();
    headers.append('Authorization', token);

    return headers;
}