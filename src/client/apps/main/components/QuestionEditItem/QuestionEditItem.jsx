import * as React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ANSWER_TYPE } from "../../../../../models/Test/config";
import AnswerEditList from "../../../../containers/main/AnswerEditList";
import Button from "react-bootstrap/Button";

class QuestionEditItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggleChange = this.handleToggleChange.bind(this);
    }

    handleToggleChange({ target: { value } }) {
        const { onChangeAnswerType } = this.props;

        onChangeAnswerType(value);
    }

    render() {
        const {
            name,
            typeAnswer,
            answers,
            onDelete,
            onUpdateTitle,
            onAnswerListUpdate,
            title
        } = this.props;

        return (
            <>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Question:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <Form.Group controlId="">
                            <Form.Control className="test-editor__textarea"
                                          as="textarea"
                                          rows={3}
                                          value={title}
                                          onChange={event => {
                                              const titleVal = event.target.value;

                                              onUpdateTitle(titleVal);
                                          }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Question type:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <Form.Group>
                            <ToggleButtonGroup type="radio"
                                               name={`${name}_toggle_answer_type`}
                                               defaultValue={ANSWER_TYPE.ONE}>
                                <ToggleButton value={ANSWER_TYPE.ONE}
                                              onChange={this.handleToggleChange}>One answer</ToggleButton>
                                <ToggleButton value={ANSWER_TYPE.MULTIPLE}
                                              onChange={this.handleToggleChange}>Multiple answers</ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Answers:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <AnswerEditList name={name}
                                        type={typeAnswer}
                                        answers={answers}
                                        onAppendAnswer={() => onAnswerListUpdate(name)} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Button className="float-right"
                                variant="danger"
                                onClick={onDelete}>
                            Delete question
                        </Button>
                    </Col>
                </Row>

                <hr/>
            </>
        );
    }
}

QuestionEditItem.propTypes = {
    name: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    typeAnswer: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]).isRequired,
    title: PropTypes.string,
    answers: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.string,
            isRight: PropTypes.bool
        })
    ).isRequired,
    onDelete: PropTypes.func,
    onUpdateTitle: PropTypes.func,
    onChangeAnswerType: PropTypes.func,
    onAnswerListUpdate: PropTypes.func
};

export default QuestionEditItem;