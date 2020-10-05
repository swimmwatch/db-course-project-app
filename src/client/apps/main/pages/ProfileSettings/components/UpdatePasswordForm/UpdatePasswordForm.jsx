import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as authActions from "../../../../../../actions/auth";
import * as editProfileSettings from "../../../../../../services/editProfileSettings";

class UpdatePasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            repeatNewPassword: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this._generateFormData = this._generateFormData.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    _generateFormData() {
        const formData = new FormData();
        formData.append('password', this.password);
        formData.append('newPassword', this.newPassword);
        formData.append('repeatNewPassword', this.repeatNewPassword);

        return formData;
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const { dispatch, history, onSubmitError } = this.props;

        try {
            const formData = this._generateFormData();
            await editProfileSettings.updatePassword(formData);

            dispatch(authActions.logOut());

            history.push("/login");
        } catch ({ errors }) {
            onSubmitError(errors);
        }
    }

    render() {
        return (
            <>
                <h5>Update password:</h5>
                <Form>
                    <Form.Group controlId="profile-settings-form__password">
                        <Form.Control type="password"
                                      placeholder="Enter current password"
                                      name="password"
                                      onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="profile-settings-form__repassword">
                        <Form.Control type="password"
                                      placeholder="Enter new password"
                                      name="newPassword"
                                      onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="profile-settings-form__repassword">
                        <Form.Control type="password"
                                      placeholder="Enter new password again"
                                      name="repeatNewPassword"
                                      onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button variant="primary"
                            type="submit"
                            onClick={this.handleFormSubmit}>Save</Button>
                </Form>
            </>
        );
    }
}

UpdatePasswordForm.propTypes = {
    onSubmitError: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    history: ReactRouterPropTypes.history
};

const connectedUpdatePasswordForm = connect()(UpdatePasswordForm);
const connectedUpdatePasswordFormWithRouter = withRouter(connectedUpdatePasswordForm);

export { connectedUpdatePasswordFormWithRouter as UpdatePasswordForm };