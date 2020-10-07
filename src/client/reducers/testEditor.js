import * as testEditorActions from "../actions/testEditor";
import {ANSWER_TYPE} from "../apps/main/components/AnswerEditList/config";

let initState = {
    info: {
        title: '',
        description: '',
        tags: ['hello', 'js', 'react', 'basic']
    },
    questions: [
        { title: '', typeAnswer: ANSWER_TYPE.ONE, answers: [ { content: '', isRight: false } ] }
    ]
};

export default (state = initState, action) => {
    let newState = {...state};

    switch (action.type) {
        case testEditorActions.RESET:
            return { ...initState };
        case testEditorActions.UPDATE:
            return { ...action }
        case testEditorActions.UPDATE_TITLE: {
            newState.info.title = action.title;

            return newState;
        }
        case testEditorActions.UPDATE_DESCRIPTION: {
            newState.info.description = action.description;

            return newState;
        }
        default:
            return state;
    }
};