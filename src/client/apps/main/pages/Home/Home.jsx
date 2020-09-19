import * as React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./style.scss";

const Home = () => {
    return (
        <Container className="p-3">
            <Jumbotron>
                <h1>Hello!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
            </Jumbotron>
            <Row>
                <Col lg={4}>
                    <h2>Create</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis delectus dolorem eius expedita nemo neque pariatur perferendis quasi! Accusantium ad atque corporis deleniti eius, eligendi qui rem sunt vitae!</p>
                </Col>
                <Col lg={4}>
                    <h2>Share</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis delectus dolorem eius expedita nemo neque pariatur perferendis quasi! Accusantium ad atque corporis deleniti eius, eligendi qui rem sunt vitae!</p>
                </Col>
                <Col lg={4}>
                    <h2>Statistic</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis delectus dolorem eius expedita nemo neque pariatur perferendis quasi! Accusantium ad atque corporis deleniti eius, eligendi qui rem sunt vitae!</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;