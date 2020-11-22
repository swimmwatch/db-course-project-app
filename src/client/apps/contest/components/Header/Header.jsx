import * as React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import * as authActions from "../../../../actions/auth";

import {
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
    faClipboardList,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import LogOutModal from "../../../../components/LogOutModal";

import "./style.scss";

const Header = ({ isLoggedIn, user, dispatch, history }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const showModal = () => setModalShow(true);
    const hideModal = () => setModalShow(false);

    const onLogOut = () => {
        dispatch(authActions.logOut());

        setModalShow(false);

        history.push("/");
    };

    return (
        <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <FontAwesomeIcon icon={faClipboardList}/> PassQuiz Contest
                </Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                {!isLoggedIn ? (
                    <>
                        <LinkContainer to="/signup">
                            <Nav.Link> <FontAwesomeIcon icon={faUserPlus}/> Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link> <FontAwesomeIcon icon={faSignInAlt}/> Login</Nav.Link>
                        </LinkContainer>
                    </>
                ) : (
                    <NavDropdown title={
                        <span>
                            <FontAwesomeIcon icon={faUser}/> {user.login}
                        </span>
                    } id="user-nav-dropdown">
                        <LinkContainer to="/tests">
                            <NavDropdown.Item>
                                <FontAwesomeIcon icon={faList}/> Tests
                            </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item onClick={showModal}>
                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Nav>

            <LogOutModal onHide={hideModal}
                         show={modalShow}
                         onLogOut={onLogOut}/>
        </Navbar>
    );
}

Header.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        login: PropTypes.string
    }).isRequired
};

export default Header;