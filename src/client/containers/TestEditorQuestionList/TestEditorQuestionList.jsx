import {connect} from "react-redux";
import QuestionEditList from "../../../client/apps/main/components/QuestionEditList";

function mapStateToProps(state) {
    const { questions } = state.testEditor;

    return { questions };
}

const TestEditorQuestionList = connect(mapStateToProps)(QuestionEditList);

export { TestEditorQuestionList };