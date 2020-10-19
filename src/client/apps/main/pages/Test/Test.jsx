import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Question from "../../components/Question";
import {ANSWER_TYPE} from "../../components/AnswerEditList/config";

const questions = [
    {
        title: 'What kind of problems?',
        type: ANSWER_TYPE.ONE,
        answers: [
            '1',
            '2',
            '3'
        ]
    },
    {
        title: 'What kind of problems?',
        type: ANSWER_TYPE.MULTIPLE,
        answers: [
            '1',
            '2',
            '3'
        ]
    }
];

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="p-3">
                    {
                        questions.map((question, i) => {
                            const { title, type, answers } = question;

                            return (
                                <Row key={i}>
                                    <Col lg={{span: 6, offset: 3}} style={{ paddingBottom: '10px' }}>
                                        <Question title={title}
                                                  type={type}
                                                  id={i}
                                                  answers={answers} />
                                    </Col>
                                </Row>
                            );
                        })
                    }
                    <Row className="justify-content-center">
                        <Button variant="success"
                                size="lg">
                            Submit
                        </Button>
                    </Row>
            </Container>
        );
    }
}

export default Test;