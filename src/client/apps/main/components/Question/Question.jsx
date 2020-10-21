import * as React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import AnswerList from "../AnswerList";
import Answer from "../Answer";
import {ANSWER_TYPE} from "../AnswerEditList/config";

import "./style.scss";

const Question = ({ title, answers, type, id }) => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header>
                <Card.Title>Question {id + 1}</Card.Title>
                <Card.Body>
                    <Card.Text>{title}</Card.Text>
                </Card.Body>
            </Card.Header>

            <AnswerList>
                {
                    answers.map((answer, i) => {
                        const name = `${id}_answer`;
                        const { content, isChecked } = answer;

                        return (
                            <Answer type={type}
                                    content={content}
                                    name={name}
                                    checked={isChecked}
                                    key={i} />
                        );
                    })
                }
            </AnswerList>
        </Card>
    );
};

Question.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.string,
            isChecked: PropTypes.bool
        })
    ).isRequired,
    id: PropTypes.number.isRequired
};

export default Question;