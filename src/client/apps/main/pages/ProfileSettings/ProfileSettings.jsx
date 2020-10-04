import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./style.scss";

const ProfileSettings = () => {
    return (
        <Container className="p-3">
            <Row>
                <Col lg={6}>
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
                </Col>
            </Row>
            {/*<h5>Danger zone</h5>*/}
            {/*<Button variant="danger">Delete profile</Button>*/}
        </Container>
    );
};

export default ProfileSettings;