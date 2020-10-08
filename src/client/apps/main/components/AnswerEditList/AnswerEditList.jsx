import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnswerEditItem from "../AnswerEditItem";
import {ANSWER_TYPE} from "./config";
import * as testEditorActions from "../../../../actions/testEditor";

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
            deleteAnswer
        } = this.props;

        return (
            <>
                <p>Choose right answer:</p>
                <Form.Group controlId="">
                    {
                        answers.map((el, i) => {
                            return (
                                <AnswerEditItem key={i}
                                                name={name}
                                                type={type}
                                                onDeleteAnswer={() => deleteAnswer(name, i)} />
                            );
                        })
                    }
                </Form.Group>
                <Button variant="primary" onClick={onAppendAnswer}>
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
    onAppendAnswer: PropTypes.func,
    deleteAnswer: PropTypes.func
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        deleteAnswer: (questionId, answerId) => dispatch(testEditorActions.deleteAnswer(questionId, answerId))
    };
}

const connectedAnswerEditList = connect(mapStateToProps, mapDispatchToProps)(AnswerEditList);

export { connectedAnswerEditList as AnswerEditList };