import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import "./style.scss";

class AnswerEditItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InputGroup className="answer-edit-item">
                <InputGroup.Prepend>
                    <InputGroup.Radio name="1" aria-label="Radio button for following text input" />
                </InputGroup.Prepend>
                <FormControl aria-label="Text input with radio button" />
                <InputGroup.Append>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default AnswerEditItem;