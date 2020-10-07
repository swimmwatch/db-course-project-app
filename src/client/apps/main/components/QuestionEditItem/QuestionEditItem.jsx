import * as React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import AnswerEditList from "../AnswerEditList";
import Button from "react-bootstrap/Button";

class QuestionEditItem extends React.Component {
    constructor(props) {
        super(props);
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
                        <Form.Group controlId="">
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                <ToggleButton value={1}>One answer</ToggleButton>
                                <ToggleButton value={2}>Multiple answers</ToggleButton>
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