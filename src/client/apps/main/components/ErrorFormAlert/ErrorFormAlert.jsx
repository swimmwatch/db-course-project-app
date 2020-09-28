import * as React from "react";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const ErrorFormAlert = ({ listErrors, show, onHide }) => {
    return (
        <Alert variant="danger" show={show}>
            <Alert.Heading>You got an error!</Alert.Heading>
            <ul>
                {
                    listErrors.map(({ message }, i) => <li key={i}>{message}</li>)
                }
            </ul>
            <hr/>
            <div className="d-flex justify-content-end">
                <Button variant="outline-danger"
                        onClick={onHide}>Ok</Button>
            </div>
        </Alert>
    );
}

ErrorFormAlert.propTypes = {
    listErrors: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

export default ErrorFormAlert;