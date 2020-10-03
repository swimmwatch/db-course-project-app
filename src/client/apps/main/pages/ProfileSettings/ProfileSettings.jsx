import * as React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./style.scss";

const ProfileSettings = () => {
    return (
        <Container className="p-3">
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
                <Form.Group controlId="main-signup-form__repassword">
                    <Form.Label className="main-signup-form__label">Repeat password:</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Enter password"
                                  name="repassword" />
                </Form.Group>
                <Button variant="primary"
                        type="submit"
                        block>Submit</Button>
            </Form>
        </Container>
    );
};

export default ProfileSettings;