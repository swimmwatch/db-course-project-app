import * as React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

class ErrorFormAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    render() {
        return (
            <Alert variant="danger" show={this.props.show}>
                <Alert.Heading>You got an error!</Alert.Heading>
                <ul>
                    {
                        this.props.listErrors.map(({ message }, i) => <li key={i}>{message}</li>)
                    }
                </ul>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-danger"
                            onClick={this.props.onHide}>Ok</Button>
                </div>
            </Alert>
        );
    }
}

ErrorFormAlert.propTypes = {
    listErrors: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

export default ErrorFormAlert;