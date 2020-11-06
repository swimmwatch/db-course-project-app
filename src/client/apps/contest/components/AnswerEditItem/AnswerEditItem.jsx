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

        const { content } = props;

        this.state = {
            answerValue: content
        }

        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    }

    handleChangeAnswer(event) {
        const { onChangeAnswer } = this.props;
        const { checked, type } = event.target;

        onChangeAnswer(checked, type);
    }

    render() {
        const {
            name,
            type,
            content,
            isRight,
            onDeleteAnswer,
            onChangeAnswerText
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
                                                          checked={isRight}
                                                          onChange={this.handleChangeAnswer}
                                                          aria-label="Radio button for following text input" />
                                    );
                                case ANSWER_TYPE.MULTIPLE:
                                    return (
                                        <InputGroup.Checkbox name={name}
                                                             checked={isRight}
                                                             onChange={this.handleChangeAnswer}
                                                             aria-label="Radio button for following text input" />
                                    );
                            }
                        })()
                    }
                </InputGroup.Prepend>
                <FormControl aria-label="Text input with radio button"
                             value={content}
                             onChange={(event => {
                                 const { value } = event.target;

                                 onChangeAnswerText(value);
                             })} />
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
    content: PropTypes.string.isRequired,
    isRight: PropTypes.bool.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onChangeAnswerText: PropTypes.func.isRequired,
    onChangeAnswer: PropTypes.func.isRequired
};

export default AnswerEditItem;