import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as testEditorActions from "../../../../actions/testEditor";
import Tag from "../Tag";

import "./style.scss";

const TagList = ({ tags, dispatch }) => {
    return (
        <ul className="tag-list">
            {
                tags.map((content, i) => {
                    return (
                        <Tag content={content}
                             key={i}
                             onDelete={() => dispatch(testEditorActions.deleteTag(i))} />
                    );
                })
            }
        </ul>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    dispatch: PropTypes.func
};

function mapStateToProps(state) {
    const { tags } = state.testEditor.info;

    return { tags };
}

const connectTagList = connect(mapStateToProps)(TagList);

export { connectTagList as TagList };