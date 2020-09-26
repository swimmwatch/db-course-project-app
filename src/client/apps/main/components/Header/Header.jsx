import * as React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { LinkContainer } from "react-router-bootstrap";

import "./style.scss";

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
                <NavDropdown title="username" id="user-nav-dropdown">
                    <LinkContainer to="/profile">
                        <NavDropdown.Item>My profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/logout">
                        <NavDropdown.Item>Logout</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}

export default Header;