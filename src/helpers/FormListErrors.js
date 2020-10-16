/**
 * Class representing a list of errors.
 */
export default class FormListErrors {
    /**
     * Create error list
     */
    constructor() {
        this.data = { errors: [] };
    }

    /**
     * Add errors from ORM model
     * @param {Array<ValidationErrorItem>} errors
     */
    addFromModelErrors(errors) {
        this.data.errors.push(
            ...errors.map(err => {
                let { message } = err;

                return { message };
            })
        );
    }

    /**
     * Add default error message
     */
    addDefault() {
        this.data.errors.push({
            message: "Oops, something went wrong."
        });
    }

    /**
     * Add custom error message to list
     * @param {string} message - Error message
     */
    add(message) {
        this.data.errors.push({ message });
    }

    /**
     * Get error list length
     * @return {number}
     */
    isNotEmpty() {
        return this.data.errors.length;
    }
}