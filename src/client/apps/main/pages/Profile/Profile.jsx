import * as React from "react";

import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./style.scss";
import Form from "react-bootstrap/Form";

const Tests = () => (
    <Container className="p-3">
        <Row>
            {['React', 'JavaScript', 'Redux', 'HTML'].map((title, i) => (
                <Col lg={4} key={i}>
                    <Card style={{margin: '10px'}}>
                        <Card.Img variant="top"
                                  src="https://via.placeholder.com/260x180" />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the cards content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
            )}
        </Row>
    </Container>
);

const Settings = () => (
    <Container className="p-3">
        <Form>
            <Form.Group controlId="main-signup-form__email">
                <Form.Label className="main-signup-form__label">Email address:</Form.Label>
                <Form.Control type="email"
                              placeholder="Enter email"
                              name="email" />
            </Form.Group>
            <Form.Group controlId="main-signup-form__login">
                <Form.Label className="main-signup-form__label">Login:</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter login"
                              name="login" />
            </Form.Group>
            <Form.Group controlId="main-signup-form__password">
                <Form.Label className="main-signup-form__label">Password:</Form.Label>
                <Form.Control type="password"
                              placeholder="Enter password"
                              name="password" />
            </Form.Group>
            <Form.Group controlId="main-signup-form__repassword">
                <Form.Label className="main-signup-form__label">Repeat password:</Form.Label>
                <Form.Control type="password"
                              placeholder="Enter password"
                              name="repassword" />
            </Form.Group>
            <Button variant="primary"
                    type="submit"
                    block>Submit</Button>
        </Form>
    </Container>
);

const Profile = () => (
    <Container className="p-3">
        <Row>
            <Col lg={3}>
                <img className="profile__avatar"
                     src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar"/>
                <p className="profile__username">Profile name</p>
            </Col>
            <Col lg={9}>
                <Nav variant="tabs" defaultActiveKey="tests">
                    <Nav.Item>
                        <LinkContainer to="/profile/tests">
                            <Nav.Link eventKey="tests">My tests</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/profile/settings">
                            <Nav.Link eventKey="settings">Settings</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>

                <Switch>
                    <Route path="/profile/tests" component={Tests} />
                    <Route path="/profile/settings" component={Settings} />
                </Switch>
            </Col>
        </Row>
    </Container>
);

export default Profile;