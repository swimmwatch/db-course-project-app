import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from "react-bootstrap/Container";

import Login from "./pages/Login";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./pages/Profile";

class App extends React.Component {
    render() {
        const App = () => (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/profile' component={Profile}/>
                </Switch>

                <Container className="p-3">
                    <Footer/>
                </Container>
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