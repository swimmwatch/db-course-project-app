import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ErrorFormAlert from "../../../../components/ErrorFormAlert";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import DeleteProfileForm from "./components/DeleteProfileForm";

import "./style.scss";

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listErrors: []
        }

        this.updateListErrors = this.updateListErrors.bind(this);
        this.hideErrorAlert = this.hideErrorAlert.bind(this);
    }

    updateListErrors(errors) {
        this.setState({ listErrors: errors })
    }

    hideErrorAlert() {
        this.setState({ listErrors: [] });
    }

    render() {
        const { listErrors } = this.state;

        return (
            <Container className="p-3">
                <Row>
                    <ErrorFormAlert listErrors={listErrors}
                                    show={listErrors.length !== 0}
                                    onHide={this.hideErrorAlert} />
                </Row>
                <Row>
                    <Col lg={6}>
                        <UpdatePasswordForm onSubmitError={this.updateListErrors} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <DeleteProfileForm onSubmitError={this.updateListErrors} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProfileSettings;