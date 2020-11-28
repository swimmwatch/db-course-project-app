import * as React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnswerEditItem from "../AnswerEditItem";
import {ANSWER_TYPE} from "../../../../../models/Test/config";

class AnswerEditList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            name,
            type,
            answers,
            onAppendAnswer,
            deleteAnswer,
            updateAnswerText,
            updateAnswers
        } = this.props;

        return (
            <>
                <p>Choose right answer:</p>
                <Form.Group controlId="">
                    {
                        answers.map((answer, i) => {
                            const { content, isRight } = answer;

                            return (
                                <AnswerEditItem key={i}
                                                name={name}
                                                type={type}
                                                isRight={isRight}
                                                content={content}
                                                onChangeAnswer={(isRight, typeAnswer) => updateAnswers(name, i, isRight, typeAnswer)}
                                                onDeleteAnswer={() => deleteAnswer(name, i)}
                                                onChangeAnswerText={value => updateAnswerText(name, i, value)} />
                            );
                        })
                    }
                </Form.Group>
                <Button variant="primary"
                        onClick={onAppendAnswer}>
                    Add answer
                </Button>
            </>
        );
    }
}

AnswerEditList.propTypes = {
    name: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    type: PropTypes.oneOf([ ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE ]).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.string,
            isRight: PropTypes.bool
        })
    ).isRequired,
    onAppendAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    updateAnswerText: PropTypes.func.isRequired,
    updateAnswers: PropTypes.func
};

export default AnswerEditList;