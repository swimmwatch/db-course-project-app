import * as React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

import "./style.scss";

const AnswerList = ({ children }) => {
    return (
        <ListGroup className="list-group-flush">
            {children}
        </ListGroup>
    );
};

AnswerList.propTypes = {
    children: PropTypes.element.isRequired
};

export default AnswerList;