import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import userConstraints from "../../../../../models/User/constraints";

import "./style.scss";

const {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MAX_LOGIN_LENGTH
} = userConstraints;

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            login: '',
            password: '',
            repeatPassword: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        console.log(name);

        this.setState({ [name]: value });
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append('login', this.state.login);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        const response = await fetch("/api/signup", {
            method: "POST",
            body: formData
        });

        const responseJson = await response.json();
        if (response.ok) {
            console.log(responseJson);
        } else {
            console.error(responseJson);
        }
    }

    render() {
        return (
            <Container className="p-3">
                <Col lg={{ offset: 3, span: 6 }}>
                    <h2 className="main-signup-form__title">Sign Up form</h2>
                    <Form>
                        <Form.Group controlId="main-signup-form__email">
                            <Form.Label className="main-signup-form__label">Email address:</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          name="email"
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="main-signup-form__login">
                            <Form.Label className="main-signup-form__label">Login:</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter login"
                                          name="login"
                                          minLength={MIN_LOGIN_LENGTH}
                                          maxLength={MAX_LOGIN_LENGTH}
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="main-signup-form__password">
                            <Form.Label className="main-signup-form__label">Password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="password"
                                          minLength={MIN_PASSWORD_LENGTH}
                                          maxLength={MAX_PASSWORD_LENGTH}
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="main-signup-form__repeat-password">
                            <Form.Label className="main-signup-form__label">Repeat password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="repeatPassword"
                                          minLength={MIN_PASSWORD_LENGTH}
                                          maxLength={MAX_PASSWORD_LENGTH}
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                block
                                onClick={this.handleFormSubmit}>Submit</Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}