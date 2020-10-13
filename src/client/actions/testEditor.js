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

export const reset = () => {
    return { type: RESET };
};

export const update = content => {
    return {
        type: UPDATE,
        content
    };
};

export const updateTitle = title => {
    return {
        type: UPDATE_TITLE,
        title
    };
};

export const updateDescription = description => {
    return {
        type: UPDATE_DESCRIPTION,
        description
    };
};

export const appendTag = tag => {
    return {
        type: APPEND_TAG,
        tag
    };
};

export const deleteTag = id => {
    return {
        type: DELETE_TAG,
        id
    };
};

export const appendQuestion = () => {
    return { type: APPEND_QUESTION };
};

export const deleteQuestion = id => {
    return {
        type: DELETE_QUESTION,
        id
    };
};

export const updateQuestionTitle = (id, title) => {
    return {
        type: UPDATE_QUESTION_TITLE,
        id,
        title
    };
};

export const changeQuestionType = (id, typeAnswer) => {
    return {
        type: UPDATE_QUESTION_TYPE,
        id,
        typeAnswer
    };
};

export const appendAnswer = questionId => {
    return { type: APPEND_ANSWER, questionId }
};

export const deleteAnswer = (questionId, answerId) => {
    return {
        type: DELETE_ANSWER,
        questionId,
        answerId
    };
};

export const updateAnswerText = (questionId, answerId, value) => {
    return {
        type: UPDATE_ANSWER_TEXT,
        questionId,
        answerId,
        value
    };
};

export const updateAnswers = (questionId, answerId, isRight, typeAnswer) => {
    return {
        type: UPDATE_ANSWERS,
        questionId,
        answerId,
        isRight,
        typeAnswer
    };
};

