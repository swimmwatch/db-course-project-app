import * as React from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";
import {ANSWER_TYPE} from "../AnswerEditList/config";

import "./style.scss";

const Answer = ({ type, name, content, isChecked, onAnswerChange }) => {
    return (
        <ListGroupItem>
            <Form.Check
                type={type}
                name={name}
                label={content}
                checked={isChecked}
                onChange={event => {
                    const { checked } = event.target;

                    onAnswerChange(checked);
                }}
            />
        </ListGroupItem>
    );
};

Answer.propTypes = {
    type: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]).isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onAnswerChange: PropTypes.func.isRequired
};

export default Answer;