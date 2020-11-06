import * as React from "react";
import PropTypes from "prop-types";
import Tag from "../Tag";

import "./style.scss";

const TagList = ({ tags, deleteTag, canDelete = true }) => {
    return (
        <ul className="tag-list">
            {
                tags.map((content, i) => {
                    return (
                        <Tag content={content}
                             key={i}
                             canDelete={canDelete}
                             onDelete={() => deleteTag(i)} />
                    );
                })
            }
        </ul>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    canDelete: PropTypes.bool,
    deleteTag: PropTypes.func,
};

export default TagList;