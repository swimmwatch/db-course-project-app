import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import "./style.scss";

export default class SignUp extends React.Component {
    render() {
        return (
            <Container className="p-3">
                <Col lg={{ offset: 4, span: 4 }}>
                    <h2 className="main-signup-form__title">Sign Up form</h2>
                    <Form>
                        <Form.Group controlId="main-signup-form__email">
                            <Form.Label className="main-signup-form__label">Email address:</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          name="email" />
                        </Form.Group>
                        <Form.Group controlId="main-signup-form__login">
                            <Form.Label className="main-signup-form__label">Login:</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter login"
                                          name="login" />
                        </Form.Group>
                        <Form.Group controlId="main-signup-form__password">
                            <Form.Label className="main-signup-form__label">Password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="password" />
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                block>Submit</Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}