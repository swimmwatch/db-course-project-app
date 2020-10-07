import * as React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const TagList = () => {
    return (
        <span>hello</span>
    );
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};

export default TagList;