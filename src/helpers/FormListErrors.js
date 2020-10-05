// TODO: add documentation

export default class FormListErrors {
    constructor() {
        this.data = { errors: [] };
    }

    addFromModelErrors(errors) {
        this.data.errors.push(
            ...errors.map(err => {
                let { message } = err;

                return { message };
            })
        );
    }

    addDefault() {
        this.data.errors.push({
            message: "Oops, something went wrong."
        });
    }

    add(message) {
        this.data.errors.push({ message });
    }

    isNotEmpty() {
        return this.data.errors.length;
    }
}