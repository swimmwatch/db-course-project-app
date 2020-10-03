import * as React from "react";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";

const ErrorFormAlert = ({ listErrors, show, onHide }) => {
    return (
        <Alert variant="danger" show={show} onClose={onHide} dismissible>
            <Alert.Heading>You got an error!</Alert.Heading>
            <ul>
                {
                    listErrors.map(({ message }, i) => <li key={i}>{message}</li>)
                }
            </ul>
        </Alert>
    );
}

ErrorFormAlert.propTypes = {
    listErrors: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

export default ErrorFormAlert;