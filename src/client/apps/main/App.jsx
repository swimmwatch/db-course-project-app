import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from 'react-router-bootstrap';

import Login from "./pages/Login";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";

class App extends React.Component {
    render() {
        const App = () => (
            <div>
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
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                </Switch>
            </div>
        );

        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;