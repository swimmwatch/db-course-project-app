import * as React from 'react';
import { createStore } from "redux";
import { Switch, Route } from 'react-router-dom';

import rootReducer from "../../reducers";

import Container from "react-bootstrap/Container";

import Login from "./pages/Login";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import HttpErrorInfo from "./components/HttpErrorInfo";
import {NOT_FOUND} from "http-status-codes";

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/profile' component={Profile}/>
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