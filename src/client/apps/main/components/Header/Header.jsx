import * as React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import * as authActions from "../../../../actions/auth";

import {
    faClipboardList,
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faIdCard,
    faUserPlus,
    faPlus
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
                    <FontAwesomeIcon icon={faClipboardList} /> PassQuiz
                </Navbar.Brand>
            </LinkContainer>
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
                        <LinkContainer to="/profile">
                            <NavDropdown.Item>
                                <FontAwesomeIcon icon={faIdCard} /> My profile
                            </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/test/edit">
                            <NavDropdown.Item>
                                <FontAwesomeIcon icon={faPlus} /> Create test
                            </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={showModal}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                ) }
            </Nav>

            <LogOutModal onHide={hideModal}
                         show={modalShow}
                         onLogOut={onLogOut}/>
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