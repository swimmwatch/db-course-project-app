import { LoremIpsum } from "lorem-ipsum";
import { random } from "lodash";
import * as React from "react";

import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListTestCards from "../../components/ListTestCards";

import "./style.scss";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const tests = [];

for (let i = 0; i < 7; i++) {
    tests.push({
        title: lorem.generateWords(random(1, 10)),
        description: lorem.generateWords(random(10, 50))
    });
}

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
                    <Route path="/profile/tests" render={() => <ListTestCards tests={tests} />} />
                    <Route path="/profile/settings" component={Settings} />
                </Switch>
            </Col>
        </Row>
    </Container>
);

export default Profile;