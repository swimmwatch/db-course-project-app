import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "../../hoc/PrivateRoute";
import NotIsLoggedInRoute from "../../hoc/NotIsLoggedInRoute";

import Container from "react-bootstrap/Container";

import Home from './pages/Home';
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Test from "../../containers/Test";
import TestResult from "../../pages/TestResult";

import Footer from "../../components/Footer";
import Header from "./components/Header";
import AllTests from "./pages/AllTests";
import HttpErrorInfo from "../../components/HttpErrorInfo";
import {NOT_FOUND} from "http-status-codes";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/contest' component={Home} />
                    <PrivateRoute path='/contest/tests' component={AllTests} />
                    <PrivateRoute exact path='/test/pass' component={Test} />
                    <NotIsLoggedInRoute path='/login' component={Login}/>
                    <NotIsLoggedInRoute path='/signup' component={SignUp} />
                    <PrivateRoute exact path='/test/result' component={TestResult} />
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