/**
 * Toggle state of app loader
 */
export function toggleLoader() {
    const loader = document.querySelector('.loader');

    loader.classList.toggle('loader_hide');
}