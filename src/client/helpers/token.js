const TOKEN_ID = 'TOKEN';

export function getToken() {
    return localStorage.getItem(TOKEN_ID);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_ID);
}