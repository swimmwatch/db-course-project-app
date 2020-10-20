export const INIT = "INIT";

export const init = internalState => {
    return {
        type: INIT,
        internalState
    }
};