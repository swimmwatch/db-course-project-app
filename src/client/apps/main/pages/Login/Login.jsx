import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

import userConstraints from "../../../../../models/User/constraints";

import "./style.scss";

const {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MAX_LOGIN_LENGTH
} = userConstraints;

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            readMeChecked: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleCheckboxChange(event) {
        const { name, checked } = event.target;

        this.setState({ [name]: checked });
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append('login', this.state.login);
        formData.append('password', this.state.password);

        const response = await fetch("/api/signin", {
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
                <Col lg={{offset: 3, span: 6}}>
                    <h2 className="main-login-form__title">Login form</h2>
                    <Form>
                        <Form.Group controlId="main-login-form__login">
                            <Form.Label className="main-login-form__label">Login:</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter login"
                                          name="login"
                                          minLength={MIN_LOGIN_LENGTH}
                                          maxLength={MAX_LOGIN_LENGTH}
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="main-login-form__password">
                            <Form.Label className="main-login-form__label">Password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="password"
                                          minLength={MIN_PASSWORD_LENGTH}
                                          maxLength={MAX_PASSWORD_LENGTH}
                                          onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="main-login-form__checkbox">
                            <Form.Check type="checkbox"
                                        label="Remember me"
                                        name="readMeChecked"
                                        onChange={this.handleCheckboxChange} />
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                block onClick={this.handleFormSubmit}>Submit</Button>
                        <LinkContainer to="#">
                            <a className="main-login-form__forgot-password">Forgot password?</a>
                        </LinkContainer>
                    </Form>
                </Col>
            </Container>
        );
    }
}