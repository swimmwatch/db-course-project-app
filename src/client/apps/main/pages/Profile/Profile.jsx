import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {NOT_FOUND} from "http-status-codes";

import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUserCog, faPoll } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import ProfileSettings from "../ProfileSettings";
import ProfileAttempts from "../ProfileAttempts";
import HttpErrorInfo from "../../components/HttpErrorInfo";
import ProfileTests from "../ProfileTests";

import "./style.scss";

const Profile = ({ user }) => {
    return (
        <Container className="p-3">
            <Row>
                <Col lg={3}>
                    <img className="profile__avatar"
                         src="/static/default_avatar.png" alt="avatar"/>
                    <p className="profile__username">{ user.login }</p>
                </Col>
                <Col lg={9}>
                    <Nav variant="tabs" defaultActiveKey="tests">
                        <Nav.Item>
                            <LinkContainer to="/profile/tests">
                                <Nav.Link eventKey="tests">
                                    <FontAwesomeIcon icon={faList} /> Tests
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/profile/attempts">
                                <Nav.Link eventKey="attempts">
                                    <FontAwesomeIcon icon={faPoll} /> Attempts
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/profile/settings">
                                <Nav.Link eventKey="settings">
                                    <FontAwesomeIcon icon={faUserCog} /> Settings
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>

                    <Switch>
                        <Route exact path="/profile" render={() => <ProfileTests />} />
                        <Route path="/profile/tests" render={() => <ProfileTests />} />
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