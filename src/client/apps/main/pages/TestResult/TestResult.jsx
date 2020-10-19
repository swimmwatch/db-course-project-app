import * as React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ResultStatus from "../../components/ResultStatus";
// import ListGroup from "react-bootstrap/ListGroup";
// import ListGroupItem from "react-bootstrap/ListGroupItem";

class TestResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        <tr>
                            <td>1</td>
                            <td><ResultStatus isCorrect={true} /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><ResultStatus isCorrect={false} /></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default TestResult;