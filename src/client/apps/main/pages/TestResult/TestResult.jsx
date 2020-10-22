import * as React from "react";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ResultStatus from "../../components/ResultStatus";
import * as testResultService from "../../../../services/testResult";

class TestResult extends React.Component {
    constructor(props) {
        super(props);

        // get attempt id from url params
        const { location } = props;
        let query = new URLSearchParams(location.search);

        const attemptId = parseInt(query.get("id"));

        this.state = {
            attemptId,
            userAnswers: []
        };
    }

    async componentDidMount() {
        const { attemptId } = this.state;

        let userAnswers = null;
        try {
            userAnswers = await testResultService.init(attemptId);
        } catch (err) {
            console.log(err);
        }

        this.setState({ userAnswers });
    }

    render() {
        const { userAnswers } = this.state;

        return (
            <Container className="p-3">
                <Table responsive="lg">
                    <thead>
                        <tr>
                            <th>Question ID</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userAnswers.map((answer, i) => {
                                const { isCorrect } = answer;

                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><ResultStatus isCorrect={isCorrect} /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}

TestResult.propTypes = {
    location: ReactRouterPropTypes.location
};

export default withRouter(TestResult);