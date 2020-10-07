import * as React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnswerEditItem from "../AnswerEditItem";
import {ANSWER_TYPE} from "./config";

class AnswerEditList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { name } = this.props;

        return (
            <>
                <p>Choose right answer:</p>
                <Form.Group controlId="">
                    {
                        ["1", "2"].map((el, i) => {
                            return <AnswerEditItem key={i}
                                                   name={name}
                                                   type={ANSWER_TYPE.MULTIPLE} />
                        })
                    }
                </Form.Group>
                <Button type="primary">
                    Add answer
                </Button>
            </>
        );
    }
}

AnswerEditList.propTypes = {
    name: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    type: PropTypes.oneOf([ ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE ])
};

export { AnswerEditList };