import * as testEditorActions from "../actions/testEditor";
import {createQuestion} from "../helpers/question";

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
            return { ...newState }
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
        default:
            return state;
    }
};