export const RESET = "RESET";
export const UPDATE = "UPDATE";
export const UPDATE_TITLE = "UPDATE_TITLE";

export const reset = () => {
    return { type: RESET };
};

export const updateTitle = title => {
    return {
        type: UPDATE_TITLE,
        title
    }
};
