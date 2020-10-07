import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tag from "../Tag";

import "./style.scss";

const TagList = ({ tags }) => {
    return (
        <ul className="tag-list">
            {
                tags.map((content, i) => {
                    return (
                        <Tag content={content}
                             key={i} />
                    );
                })
            }
        </ul>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};

function mapStateToProps(state) {
    const { tags } = state.testEditor.info;

    return { tags };
}

const connectTagList = connect(mapStateToProps)(TagList);

export { connectTagList as TagList };