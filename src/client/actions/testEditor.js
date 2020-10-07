export const RESET = "RESET";
export const UPDATE = "UPDATE";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";

export const reset = () => {
    return { type: RESET };
};

export const updateTitle = title => {
    return {
        type: UPDATE_TITLE,
        title
    }
};

export const updateDescription = description => {
    return {
        type: UPDATE_DESCRIPTION,
        description
    }
};
