import {ANSWER_TYPE} from "../apps/main/components/AnswerEditList/config";

const createAnswer = (content = '', isRight = false) => {
    return {content, isRight};
};

export const createQuestion = (title = '',
                               typeAnswer = ANSWER_TYPE.ONE,
                               answers = [createAnswer(), createAnswer()]) => {
    return {title, typeAnswer, answers};
};