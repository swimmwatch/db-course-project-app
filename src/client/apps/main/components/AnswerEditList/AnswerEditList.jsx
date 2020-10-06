import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnswerEditItem from "../AnswerEditItem";

class AnswerEditList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <p>Choose right answer:</p>
                <Form.Group controlId="">
                    <AnswerEditItem />
                    <AnswerEditItem />
                </Form.Group>
                <Button type="primary">
                    Add answer
                </Button>
            </>
        );
    }
}

export default AnswerEditList;