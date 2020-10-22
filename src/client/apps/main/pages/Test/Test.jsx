import * as React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Question from "../../components/Question";
import * as testPassingService from "../../../../services/testPassing";
import {ANSWER_TYPE} from "../../components/AnswerEditList/config";

class Test extends React.Component {
    constructor(props) {
        super(props);

        // get test id from url params
        const { location } = props;
        let query = new URLSearchParams(location.search);

        const testId = parseInt(query.get("id"));

        this.state = { testId };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { setInitData } = this.props;
        const { testId } = this.state;

        let initState = null;
        try {
            initState = await testPassingService.init(testId);
        } catch (err) {
            // TODO: handle errors

            console.error(err);
        }

        setInitData(initState);
    }

    async handleSubmit() {
        const { questions, history } = this.props;
        const { testId } = this.state;

        let attemptId = -1;
        try {
            attemptId = await testPassingService.submit(questions, testId);
        } catch (err) {
            console.error(err);
        }

        history.push(`/test/result?id=${attemptId}`);
    }

    render() {
        const { questions, updateAnswer } = this.props;

        return (
            <Container className="p-3">
                    {
                        questions.map((question, i) => {
                            const { title, typeAnswer, answers } = question;

                            return (
                                <Row key={i}>
                                    <Col lg={{span: 6, offset: 3}}
                                         style={{ paddingBottom: '10px' }}>
                                        <Question title={title}
                                                  type={typeAnswer}
                                                  id={i}
                                                  answers={answers}
                                                  onAnswerChange={updateAnswer}/>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                    <Row className="justify-content-center">
                        <Button variant="success"
                                size="lg"
                                onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Row>
            </Container>
        );
    }
}

Test.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            typeAnswer: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]),
            answers: PropTypes.arrayOf(
                PropTypes.exact({
                    content: PropTypes.string,
                    isChecked: PropTypes.bool
                })
            )
        })
    ).isRequired,
    setInitData: PropTypes.func.isRequired,
    updateAnswer: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.location.isRequired
};

export default withRouter(Test);