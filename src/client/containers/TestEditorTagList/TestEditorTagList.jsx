import {connect} from "react-redux";
import TagList from "../../../client/apps/main/components/TagList";
import * as testEditorActions from "../../actions/testEditor";

function mapStateToProps(state) {
    const { tags } = state.testEditor.info;

    return { tags };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteTag: (i) => dispatch(testEditorActions.deleteTag(i))
    };
}

const TestEditorTagList = connect(mapStateToProps, mapDispatchToProps)(TagList);

export { TestEditorTagList };