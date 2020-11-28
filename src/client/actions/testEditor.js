export const RESET = "RESET";
export const UPDATE = "UPDATE";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const APPEND_TAG = "APPEND_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const APPEND_QUESTION = "APPEND_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const UPDATE_QUESTION_TITLE = "UPDATE_QUESTION_TITLE";
export const UPDATE_QUESTION_TYPE = "UPDATE_QUESTION_TYPE";
export const APPEND_ANSWER = "APPEND_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const UPDATE_ANSWER_TEXT = "UPDATE_ANSWER_TEXT";
export const UPDATE_ANSWERS = "UPDATE_ANSWERS";

/**
 * Action that resets editor content
 * @return {{type: string}}
 */
export const reset = () => {
    return { type: RESET };
};

/**
 * Action that updates editor content
 * @param content
 * @return {{type: string, content: Object}}
 */
export const update = content => {
    return {
        type: UPDATE,
        content
    };
};

/**
 * Action that updates title
 * @param title
 * @return {{type: string, title: string}}
 */
export const updateTitle = title => {
    return {
        type: UPDATE_TITLE,
        title
    };
};

/**
 * Action that updates descriptions
 * @param description
 * @return {{description: string, type: string}}
 */
export const updateDescription = description => {
    return {
        type: UPDATE_DESCRIPTION,
        description
    };
};

/**
 * Action that append tag
 * @param tag
 * @return {{tag: string, type: string}}
 */
export const appendTag = tag => {
    return {
        type: APPEND_TAG,
        tag
    };
};

/**
 * Action that delete tag
 * @param id
 * @return {{id: number, type: string}}
 */
export const deleteTag = id => {
    return {
        type: DELETE_TAG,
        id
    };
};

/**
 * Action that append question
 * @return {{type: string}}
 */
export const appendQuestion = () => {
    return { type: APPEND_QUESTION };
};

/**
 * Action that deletes question
 * @param id
 * @return {{id: number, type: string}}
 */
export const deleteQuestion = id => {
    return {
        type: DELETE_QUESTION,
        id
    };
};

/**
 * Action that updates question title
 * @param id
 * @param title
 * @return {{id: number, type: string, title: string}}
 */
export const updateQuestionTitle = (id, title) => {
    return {
        type: UPDATE_QUESTION_TITLE,
        id,
        title
    };
};

/**
 * Action that changes question type
 * @param id
 * @param typeAnswer
 * @return {{id: number, type: string, typeAnswer: string}}
 */
export const changeQuestionType = (id, typeAnswer) => {
    return {
        type: UPDATE_QUESTION_TYPE,
        id,
        typeAnswer
    };
};

/**
 * Action that appends answer
 * @param questionId
 * @return {{questionId: number, type: string}}
 */
export const appendAnswer = questionId => {
    return { type: APPEND_ANSWER, questionId }
};

/**
 * Action that delete answer
 * @param questionId
 * @param answerId
 * @return {{answerId: number, questionId: number, type: string}}
 */
export const deleteAnswer = (questionId, answerId) => {
    return {
        type: DELETE_ANSWER,
        questionId,
        answerId
    };
};

/**
 * Action that updates answer text
 * @param questionId
 * @param answerId
 * @param value
 * @return {{answerId: number, questionId: number, type: string, value: string}}
 */
export const updateAnswerText = (questionId, answerId, value) => {
    return {
        type: UPDATE_ANSWER_TEXT,
        questionId,
        answerId,
        value
    };
};

/**
 * Action that changes answer state
 * @param questionId
 * @param answerId
 * @param isRight
 * @param typeAnswer
 * @return {{answerId: number, isRight: boolean, questionId: number, type: string, typeAnswer: string}}
 */
export const updateAnswers = (questionId, answerId, isRight, typeAnswer) => {
    return {
        type: UPDATE_ANSWERS,
        questionId,
        answerId,
        isRight,
        typeAnswer
    };
};
