import * as React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ANSWER_TYPE } from "../AnswerEditList/config";
import { AnswerEditList } from "../AnswerEditList";
import Button from "react-bootstrap/Button";

class QuestionEditItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            typeAnswer: ANSWER_TYPE.ONE
        };
    }

    render() {
        const { name } = this.props;

        return (
            <>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Question:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <Form.Group controlId="">
                            <Form.Control className="test-editor__textarea" as="textarea" rows={3} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Question type:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <Form.Group>
                            <ToggleButtonGroup type="radio" name={`${name}_toggle_answer_type`} defaultValue={ANSWER_TYPE.ONE}>
                                <ToggleButton value={ANSWER_TYPE.ONE}>One answer</ToggleButton>
                                <ToggleButton value={ANSWER_TYPE.MULTIPLE}>Multiple answers</ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Label>Answers:</Form.Label>
                    </Col>
                    <Col lg={8}>
                        <AnswerEditList name={name} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Button className="float-right"
                                variant="danger">
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
    name: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
};

export default QuestionEditItem;