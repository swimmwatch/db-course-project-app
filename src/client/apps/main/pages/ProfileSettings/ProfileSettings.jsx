import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import DeleteProfileForm from "./components/DeleteProfileForm";

import "./style.scss";

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listErrors: []
        }
    }

    render() {
        return (
            <Container className="p-3">
                <Row>
                    <Col lg={6}>
                        <UpdatePasswordForm />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <DeleteProfileForm />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProfileSettings;