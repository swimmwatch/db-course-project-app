import * as React from "react";
import PropTypes from "prop-types";
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

export default TagList;