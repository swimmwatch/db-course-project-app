import * as React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UpdatePasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            repeatNewPassword: ''
        };
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <>
                <h5>Update password:</h5>
                <Form>
                    <Form.Group controlId="profile-settings-form__password">
                        <Form.Control type="password"
                                      placeholder="Enter current password"
                                      name="password" />
                    </Form.Group>
                    <Form.Group controlId="profile-settings-form__repassword">
                        <Form.Control type="password"
                                      placeholder="Enter new password"
                                      name="newPassword" />
                    </Form.Group>
                    <Form.Group controlId="profile-settings-form__repassword">
                        <Form.Control type="password"
                                      placeholder="Enter new password again"
                                      name="repeatNewPassword" />
                    </Form.Group>
                    <Button variant="primary"
                            type="submit">Save</Button>
                </Form>
            </>
        );
    }
}

UpdatePasswordForm.propTypes = {
    onSubmitError: PropTypes.func
};

export default UpdatePasswordForm;