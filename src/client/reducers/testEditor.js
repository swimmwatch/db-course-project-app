import * as testEditorActions from "../actions/testEditor";
import {createQuestion, createAnswer} from "../helpers/question";
import {ANSWER_TYPE} from "../../models/Test/config";

let initState = {
    info: {
        title: '',
        description: '',
        tags: []
    },
    questions: [
        createQuestion(),
    ]
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case testEditorActions.RESET:
            return { ...initState };
        case testEditorActions.UPDATE:
            return action.content;
        case testEditorActions.UPDATE_TITLE: {
            newState.info.title = action.title;

            return newState;
        }
        case testEditorActions.UPDATE_DESCRIPTION: {
            newState.info.description = action.description;

            return newState;
        }
        case testEditorActions.APPEND_TAG: {
            const tagIsNotInList = !newState.info.tags.includes(action.tag);

            if (action.tag.length && tagIsNotInList) {
                newState.info.tags.push(action.tag);
            }

            return newState;
        }
        case testEditorActions.DELETE_TAG: {
            const { id } = action;

            newState.info.tags.splice(id, 1);

            return newState;
        }
        case testEditorActions.APPEND_QUESTION: {
            newState.questions.push(createQuestion());

            return newState;
        }
        case testEditorActions.DELETE_QUESTION: {
            const { id } = action;

            if (newState.questions.length > 1) {
                newState.questions.splice(id, 1);
            }

            return newState;
        }
        case testEditorActions.UPDATE_QUESTION_TITLE: {
            const { id, title } = action;

            newState.questions[id].title = title;

            return newState;
        }
        case testEditorActions.UPDATE_QUESTION_TYPE: {
            const { id, typeAnswer } = action;
            const { answers } = newState.questions[id];

            for (let currAnswer of answers) {
                currAnswer.isRight = false;
            }

            newState.questions[id].typeAnswer = typeAnswer;

            return newState;
        }
        case testEditorActions.APPEND_ANSWER: {
            const { questionId } = action;

            newState.questions[questionId].answers.push(createAnswer());

            return newState;
        }
        case testEditorActions.DELETE_ANSWER: {
            const { questionId, answerId } = action;
            const { answers } = newState.questions[questionId];

            if (answers.length > 2) {
                answers.splice(answerId, 1);
            }

            newState.questions[questionId].answers = answers;

            return newState;
        }
        case testEditorActions.UPDATE_ANSWER_TEXT: {
            const { questionId, answerId, value } = action;
            const { answers } = newState.questions[questionId];

            answers[answerId].content = value;

            return newState;
        }
        case testEditorActions.UPDATE_ANSWERS: {
            const { questionId, answerId, isRight, typeAnswer } = action;
            const { answers } = newState.questions[questionId];

            if (typeAnswer === ANSWER_TYPE.ONE) {
                for (let currAnswer of answers) {
                    currAnswer.isRight = false;
                }
            }

            answers[answerId].isRight = isRight;

            return newState;
        }
        default:
            return state;
    }
};