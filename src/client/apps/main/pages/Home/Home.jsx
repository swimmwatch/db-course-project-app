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
                    This is my course project web-application. 
                    If you find some bugs or mistakes then create issue in <a href="https://github.com/swimmwatch/db-course-project-app/issues">my GitHub repository</a>
                </p>
                <p>
                    Here you can:
                </p>
                <ol>
                    <li>create, update, delete, share tests</li>
                    <li>watch statistic</li>
                </ol>
            </Jumbotron>
        </Container>
    );
}

export default Home;