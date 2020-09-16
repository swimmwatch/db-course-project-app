import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

import "./style.scss";

const Login = () => {
    return (
        <Container className="p-3 col-lg-4 offset-lg-4">
            <h2 className="main-login-form__title">Login form</h2>
            <Form>
                <Form.Group controlId="main-login-form__login">
                    <Form.Label>Login:</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter login"
                                  name="login"/>
                </Form.Group>
                <Form.Group controlId="main-login-form__password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Enter password"
                                  name="password"/>
                </Form.Group>
                <Form.Group controlId="main-login-form__checkbox">
                    <Form.Check type="checkbox" label="Remember me"/>
                </Form.Group>
                <Button variant="primary"
                        type="submit"
                        block>Submit</Button>
                <LinkContainer to="#">
                    <a className="main-login-form__forgot-password">Forgot password?</a>
                </LinkContainer>
            </Form>
        </Container>
    );
};

export default Login;