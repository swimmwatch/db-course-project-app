import * as testPassingActions from "../actions/testPassing";

const initState = {
    questions: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case testPassingActions.INIT: {
            const { internalState } = action;

            return { questions: internalState };
        }
        default:
            return state;
    }
};