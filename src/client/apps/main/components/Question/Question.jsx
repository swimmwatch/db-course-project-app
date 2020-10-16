import * as React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";

import "./style.scss";

const Question = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the cards content.
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <Form.Check
                        type="radio"
                        name="1"
                        label="answer"
                    />
                </ListGroupItem>
                <ListGroupItem>
                    <Form.Check
                        type="radio"
                        name="1"
                        label="answer"
                    />
                </ListGroupItem>
                <ListGroupItem>
                    <Form.Check
                        type="radio"
                        name="1"
                        label="answer"
                    />
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default Question;