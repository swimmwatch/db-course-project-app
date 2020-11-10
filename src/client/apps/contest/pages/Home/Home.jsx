import * as React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import "./style.scss";

const Home = () => {
    return (
        <Container className="p-3">
            <Jumbotron>
                <h2>Hello!</h2>
                <p>
                    This is my course project desktop-application.
                    It is necessary for passing tests in full-time mode.
                    If you find some bugs or mistakes then create issue in my GitHub repository.
                </p>
                <p>
                    Here you can only pass tests.
                </p>
            </Jumbotron>
        </Container>
    );
}

export default Home;