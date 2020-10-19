import {ANSWER_TYPE} from "../apps/main/components/AnswerEditList/config";

/**
 * Create answer
 * @param {string} content - Answer text
 * @param {boolean} isRight - Result
 * @return {{isRight: boolean, content: string}}
 */
export const createAnswer = (content = '', isRight = false) => {
    return {content, isRight};
};

/**
 * Create question
 * @param {string} title - Question title
 * @param {string} typeAnswer - Answer type
 * @param {Array<{content: string, isRight: boolean}>} answers
 * @return {{answers: {isRight: boolean, content: string}[], title: string, typeAnswer: string}}
 */
export const createQuestion = (title = '',
                               typeAnswer = ANSWER_TYPE.ONE,
                               answers = [createAnswer(), createAnswer()]) => {
    return {title, typeAnswer, answers};
};