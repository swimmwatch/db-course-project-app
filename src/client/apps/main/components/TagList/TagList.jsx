import * as React from "react";
import PropTypes from "prop-types";
import Tag from "../Tag";

import "./style.scss";

const TagList = ({ tags, deleteTag }) => {
    return (
        <ul className="tag-list">
            {
                tags.map((content, i) => {
                    return (
                        <Tag content={content}
                             key={i}
                             onDelete={() => deleteTag(i)} />
                    );
                })
            }
        </ul>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired
};

export default TagList;