import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

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
                        <h5>Danger zone</h5>
                        <Button variant="danger">Delete profile</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProfileSettings;