import { connect } from "react-redux";
import * as testPassingActions from "../../actions/testPassing";
import Test from "../../apps/main/pages/Test";

function mapStateToProps(state) {
    const { questions } = state.testPassing;

    return { questions };
}

function mapDispatchToProps(dispatch) {
    return {
        setInitData: initState =>
            dispatch(testPassingActions.init(initState)),
        updateAnswer: (questionId, answerId, typeAnswer, state) =>
            dispatch(testPassingActions.updateAnswer(questionId, answerId, typeAnswer, state))
    };
}

const connectedTest = connect(mapStateToProps, mapDispatchToProps)(Test);

export { connectedTest as Test };