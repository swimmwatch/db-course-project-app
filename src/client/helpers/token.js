const TOKEN_ID = 'TOKEN';

/**
 * Get JWT
 * @return {string}
 */
export function getToken() {
    return localStorage.getItem(TOKEN_ID);
}

/**
 * Remove JWT from localStorage
 */
export function removeToken() {
    localStorage.removeItem(TOKEN_ID);
}