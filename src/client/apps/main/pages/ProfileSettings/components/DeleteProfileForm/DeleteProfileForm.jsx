import * as React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

class DeleteProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmitError } = this.props;

        onSubmitError();
    }

    render() {
        return (
            <>
                <h5>Danger zone</h5>
                <Button variant="danger"
                        onClick={this.handleSubmit}>Delete profile</Button>
            </>
        );
    }
}

DeleteProfileForm.propTypes = {
    onSubmitError: PropTypes.func
};

export default DeleteProfileForm;