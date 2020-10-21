export const INIT = "INIT";
export const UPDATE_ANSWER = "UPDATE_ANSWER";

export const init = internalState => {
    return {
        type: INIT,
        internalState
    }
};

export const updateAnswer = (questionId, answerId, state) => {
    return {
        type: INIT,
        questionId,
        answerId,
        state
    }
};