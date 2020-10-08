import {connect} from "react-redux";
import * as testEditorActions from "../../actions/testEditor";
import QuestionEditList from "../../../client/apps/main/components/QuestionEditList";

function mapStateToProps(state) {
    const { questions } = state.testEditor;

    return { questions };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteQuestion: (i) => dispatch(testEditorActions.deleteQuestion(i)),
        updateQuestionTitle: (i, title) => dispatch(testEditorActions.updateQuestionTitle(i, title)),
        changeQuestionType: (i, typeAnswer) => dispatch(testEditorActions.changeQuestionType(i, typeAnswer))
    };
}

const TestEditorQuestionList = connect(mapStateToProps, mapDispatchToProps)(QuestionEditList);

export { TestEditorQuestionList };