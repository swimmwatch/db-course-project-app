import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

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
            </InputGroup>
        );
    }
}

export default AnswerEditItem;