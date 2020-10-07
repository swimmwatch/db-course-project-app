import * as React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Tag = ({ content }) => {
    return (
        <li className="tag">{content}</li>
    );
};

Tag.propTypes = {
    content: PropTypes.string.isRequired
};

export default Tag;