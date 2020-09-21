import * as React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {LinkContainer} from "react-router-bootstrap";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>PassQuiz</Navbar.Brand>
            </LinkContainer>
            <Nav>
                <LinkContainer to="/signup">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}

export default Header;