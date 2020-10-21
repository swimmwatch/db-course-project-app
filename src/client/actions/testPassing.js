export const INIT = "INIT";
export const UPDATE_ANSWER = "UPDATE_ANSWER";

/**
 * Action that init
 * @param {Object[]} internalState - Store of questions
 * @param {string} internalState[].title - Question title
 * @param {string} internalState[].typeAnswer - Question type
 * @param {Object[]} internalState[].answers - Array of answers
 * @param {string} internalState[].answers[].content - Answer content
 * @param {boolean} internalState[].answers[].isChecked - Answer state
 * @return {{internalState: Object[], type: string}}
 */
export const init = internalState => {
    return {
        type: INIT,
        internalState
    };
};

/**
 * Action that updates answer in question
 * @param {number} questionId
 * @param {number} answerId
 * @param {boolean} state
 * @return {{answerId: number, questionId: number, state: boolean, type: string}}
 */
export const updateAnswer = (questionId, answerId, state) => {
    return {
        type: INIT,
        questionId,
        answerId,
        state
    };
};