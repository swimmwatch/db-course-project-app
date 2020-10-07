import * as testEditorActions from "../actions/testEditor";
import {ANSWER_TYPE} from "../apps/main/components/AnswerEditList/config";

let initState = {
    info: {
        title: '',
        description: '',
        tags: []
    },
    questions: [
        { title: '', typeAnswer: ANSWER_TYPE.ONE, answers: [ { content: '', isRight: false } ] }
    ]
};

export default (state = initState, action) => {
    switch (action.type) {
        case testEditorActions.RESET:
            return { ...initState };
        case testEditorActions.UPDATE:
            return { ...action }
        default:
            return state;
    }
};