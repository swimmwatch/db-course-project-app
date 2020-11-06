import * as React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import * as authActions from "../../../../actions/auth";

import {
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import "./style.scss";

const Header = ({ isLoggedIn, user, dispatch, history }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const showModal = () => setModalShow(true);

    const hideModal = () => setModalShow(false);

    const onLogOut = () => {
        dispatch(authActions.logOut());

        setModalShow(false);

        history.push("/contest");
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                { !isLoggedIn ? (
                    <>
                        <LinkContainer to="/signup">
                            <Nav.Link> <FontAwesomeIcon icon={faUserPlus} /> Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link> <FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
                        </LinkContainer>
                    </>
                ) : (
                    <NavDropdown title={
                        <span>
                            <FontAwesomeIcon icon={faUser} />  {user.login}
                        </span>
                    } id="user-nav-dropdown">
                        <LinkContainer to="#">
                            <NavDropdown.Item onClick={showModal}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                ) }
            </Nav>
            {
                isLoggedIn && (
                    <Nav>
                        <LinkContainer to="/contest/tests">
                            <Button variant="primary">Tests</Button>
                        </LinkContainer>
                    </Nav>
                )
            }

            <Modal
                size="md"
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
                    <Button onClick={onLogOut}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

Header.propTypes = {
    history: ReactRouterPropTypes.history,
    dispatch: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
        login: PropTypes.string
    })
};

function mapStateToProps(state) {
    const { isLoggedIn, user } = state.auth;

    return { isLoggedIn, user };
}

const headerWithRouter = withRouter(Header);
const connectedHeaderWithRouter = connect(mapStateToProps)(headerWithRouter);

export { connectedHeaderWithRouter as Header };