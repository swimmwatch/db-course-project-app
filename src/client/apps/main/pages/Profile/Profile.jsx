import { LoremIpsum } from "lorem-ipsum";
import { random } from "lodash";
import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {NOT_FOUND} from "http-status-codes";

import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import ListTestCards from "../../components/ListTestCards";
import ProfileSettings from "../ProfileSettings";
import ProfileAttempts from "../ProfileAttempts";

import "./style.scss";
import HttpErrorInfo from "../../components/HttpErrorInfo";

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


// TODO: Delete mock
const tests = [];

for (let i = 0; i < 7; i++) {
    tests.push({
        title: lorem.generateWords(random(1, 10)),
        description: lorem.generateWords(random(10, 50)),
        author: "Dmitry"
    });
}

const Profile = ({ user }) => {
    return (
        <Container className="p-3">
            <Row>
                <Col lg={3}>
                    <img className="profile__avatar"
                         src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar"/>
                    <p className="profile__username">{ user.login }</p>
                </Col>
                <Col lg={9}>
                    <Nav variant="tabs" defaultActiveKey="tests">
                        <Nav.Item>
                            <LinkContainer to="/profile/tests">
                                <Nav.Link eventKey="tests">My tests</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/profile/attempts">
                                <Nav.Link eventKey="attempts">My attempts</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/profile/settings">
                                <Nav.Link eventKey="settings">Settings</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>

                    <Switch>
                        <Route exact path="/profile" render={() => <ListTestCards tests={tests} />} />
                        <Route path="/profile/tests" render={() => <ListTestCards tests={tests} />} />
                        <Route path="/profile/attempts" component={ProfileAttempts} />
                        <Route path="/profile/settings" component={ProfileSettings} />
                        <Route component={() => <HttpErrorInfo status={NOT_FOUND} />} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string
    })
};

function mapStateToProps(state) {
    const { user } = state.auth;

    return { user };
}

const connectedProfile = connect(mapStateToProps)(Profile);

export { connectedProfile as Profile };