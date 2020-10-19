import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "../../hoc/PrivateRoute";
import NotIsLoggedInRoute from "../../hoc/NotIsLoggedInRoute";

import Container from "react-bootstrap/Container";

import Login from "./pages/Login";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import TestEditor from "./pages/TestEditor";
import Test from "./pages/Test";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import HttpErrorInfo from "./components/HttpErrorInfo";
import {NOT_FOUND} from "http-status-codes";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <NotIsLoggedInRoute path='/login' component={Login}/>
                    <NotIsLoggedInRoute path='/signup' component={SignUp}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                    <PrivateRoute exact path='/test/edit' component={TestEditor} />
                    <PrivateRoute exact path='/test' component={Test} />
                    <Route component={() => <HttpErrorInfo status={NOT_FOUND} />} />
                </Switch>

                <Container className="p-3">
                    <Footer/>
                </Container>
            </div>
        );
    }
}

export default App;