import * as React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import QuestionEditItem from "../../components/QuestionEditItem";

import "./style.scss";

class TestEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="p-3">
                <Row>
                    <Col lg={{offset: 2, span: 8}}>
                        <Form>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Title:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <Form.Control />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Description:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <Form.Control className="test-editor__textarea" as="textarea" rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Tags:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                            />
                                            <InputGroup.Append>
                                                <Button variant="primary">Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr/>

                            <QuestionEditItem />
                            <QuestionEditItem />
                            <QuestionEditItem />

                            <Row>
                                <Col lg={12}>
                                    <div className="test-editor__submit-section">
                                        <div className="test-editor__submit-section-row">
                                            <Button className="test-editor__submit-btn"
                                                    type="primary"
                                                    size="lg">
                                                Add question
                                            </Button>
                                        </div>
                                        <div className="test-editor__submit-section-row">
                                            <Button className="test-editor__submit-btn"
                                                    type="primary"
                                                    size="lg">
                                                Publish
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

TestEditor.propsType = {
    dispatch: PropTypes.func,
    history: ReactRouterPropTypes.history
};

const connectedTestEditor = connect()(TestEditor);

export { connectedTestEditor as TestEditor };