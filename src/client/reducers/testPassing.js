import * as testPassingActions from "../actions/testPassing";
import {ANSWER_TYPE} from "../../models/Test/config";


const initState = {
    questions: []
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case testPassingActions.INIT: {
            const { internalState } = action;

            return { questions: internalState };
        }
        case testPassingActions.UPDATE_ANSWER: {
            const {
                questionId,
                answerId,
                typeAnswer,
                state
            } = action;
            const { questions } = newState;
            const { answers } = questions[questionId];

            // reset states others answers
            if (typeAnswer === ANSWER_TYPE.ONE) {
                for (let currAnswer of answers) {
                    currAnswer.isChecked = false;
                }
            }

            answers[answerId].isChecked = state;

            return newState;
        }
        default:
            return state;
    }
};