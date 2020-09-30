import * as React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { LinkContainer } from "react-router-bootstrap";

import "./style.scss";

const Header = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const showModal = () => setModalShow(true);

    const hideModal = () => setModalShow(false);

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
                    <LinkContainer to="#">
                        <NavDropdown.Item onClick={showModal}>Logout</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Nav>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={hideModal}
                show={modalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to log-off?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hideModal}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

export default Header;