import * as React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { ANSWER_TYPE } from "../AnswerEditList/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import "./style.scss";

class AnswerEditItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            name,
            type,
            onDeleteAnswer
        } = this.props;

        return (
            <InputGroup className="answer-edit-item">
                <InputGroup.Prepend>
                    {
                        (() => {
                            switch (type) {
                                case ANSWER_TYPE.ONE:
                                    return (
                                        <InputGroup.Radio name={name}
                                                          aria-label="Radio button for following text input" />
                                    );
                                case ANSWER_TYPE.MULTIPLE:
                                    return (
                                        <InputGroup.Checkbox name={name}
                                                             aria-label="Radio button for following text input" />
                                    );
                            }
                        })()
                    }
                </InputGroup.Prepend>
                <FormControl aria-label="Text input with radio button" />
                <InputGroup.Append>
                    <Button variant="danger"
                            onClick={onDeleteAnswer}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

AnswerEditItem.propTypes = {
    name: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    type: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]).isRequired,
    onDeleteAnswer: PropTypes.func
};

export default AnswerEditItem;