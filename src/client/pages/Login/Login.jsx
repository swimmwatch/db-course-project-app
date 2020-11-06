import * as React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ErrorFormAlert from "../../components/ErrorFormAlert";

import authService from "../../services/auth";
import * as authActions from "../../actions/auth";
import userConstraints from "../../../models/User/constraints";

import "./style.scss";

const {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MAX_LOGIN_LENGTH
} = userConstraints;

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            readMeChecked: false,

            listErrors: [],

            isLoading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.hideErrorAlert = this.hideErrorAlert.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleCheckboxChange(event) {
        const { name, checked } = event.target;

        this.setState({ [name]: checked });
    }

    _generateFormData() {
        const formData = new FormData();

        formData.append('login', this.state.login);
        formData.append('password', this.state.password);

        return formData;
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const { history, dispatch } = this.props;
        const formData = this._generateFormData();

        this.toggleLoadingState();

        try {
            const { token, user } = await authService.signIn(formData);

            localStorage.setItem('TOKEN', token);

            dispatch(authActions.success(user));

            history.push('/');
        } catch ({ errors }) {
            this.setState({ listErrors: errors });
        }

        this.toggleLoadingState();
    }

    hideErrorAlert() {
        this.setState({
            listErrors: []
        });
    }

    toggleLoadingState() {
        this.setState(prev => {
            return {
                isLoading: !prev.isLoading
            }
        });
    }

    render() {
        const { listErrors, isLoading } = this.state;

        return (
            <Container className="p-3">
                <Col lg={{offset: 3, span: 6}}>
                    <h2 className="main-login-form__title">Login form</h2>
                    <Form>
                        <ErrorFormAlert listErrors={listErrors}
                                        show={listErrors.length !== 0}
                                        onHide={this.hideErrorAlert} />
                        <Form.Group controlId="main-login-form__login">
                            <Form.Control type="text"
                                          placeholder="Enter login"
                                          name="login"
                                          minLength={MIN_LOGIN_LENGTH}
                                          maxLength={MAX_LOGIN_LENGTH}
                                          required
                                          onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="main-login-form__password">
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="password"
                                          minLength={MIN_PASSWORD_LENGTH}
                                          maxLength={MAX_PASSWORD_LENGTH}
                                          required
                                          onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                block
                                disabled={isLoading}
                                onClick={this.handleFormSubmit}>
                            { isLoading ? 'Loading...' : 'Submit' }
                        </Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}

Login.propTypes = {
    location: ReactRouterPropTypes.location,
    history: ReactRouterPropTypes.history,
    dispatch: PropTypes.func
};

const connectedLogin = connect()(Login);

export { connectedLogin as Login };