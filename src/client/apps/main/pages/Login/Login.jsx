import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Login = () => {
    return (
        <Container className="p-3 col-lg-4 offset-lg-4">
            <h2>Login form</h2>
            <Form>
                <Form.Group controlId="main-form-login">
                    <Form.Label>Login:</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter login"
                                  name="login"/>
                </Form.Group>
                <Form.Group controlId="main-form-password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Enter password"
                                  name="password"/>
                </Form.Group>
                <Button variant="primary"
                        type="submit"
                        block>Submit</Button>
                <p className="form_forgot-password">Forgot password?</p>
            </Form>
        </Container>
    );
};

export default Login;