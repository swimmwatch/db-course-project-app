import * as React from "react";

import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

// eslint-disable-next-line react/display-name,@typescript-eslint/explicit-module-boundary-types
export default () => {
    return (
        <Container className="p-3">
            <Jumbotron>
                <h1>Hello!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <LinkContainer to="/login">
                        <Button variant="primary">Sign In</Button>
                    </LinkContainer>
                </p>
            </Jumbotron>
        </Container>
    );
}