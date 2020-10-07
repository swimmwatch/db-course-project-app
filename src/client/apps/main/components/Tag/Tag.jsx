import * as React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Tag = () => {
    return (
        <span>hello</span>
    );
};

Tag.propTypes = {
    content: PropTypes.string.isRequired
};

export default Tag;