import {connect} from "react-redux";
import AnswerEditList from "../../../apps/main/components/AnswerEditList";
import * as testEditorActions from "../../../actions/testEditor";

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        deleteAnswer: (questionId, answerId) => dispatch(testEditorActions.deleteAnswer(questionId, answerId)),
        updateAnswerText: (questionId, answerId, value) => dispatch(testEditorActions.updateAnswerText(questionId, answerId, value)),
        updateAnswers: (questionId, answerId, isRight, typeAnswer) => dispatch(testEditorActions.updateAnswers(questionId, answerId, isRight, typeAnswer))
    };
}

const connectedAnswerEditList = connect(mapStateToProps, mapDispatchToProps)(AnswerEditList);

export { connectedAnswerEditList as AnswerEditList };