import * as React from "react";
import Container from "react-bootstrap/Container";
import TableStatistic from "../../components/TableStatistic";

const TestStatistic = () => {
    return (
        <Container className="p-3">
            <TableStatistic rows={[ { attemptId: 1, user: 'swim', date: '000', result: 0.8 } ]} />
        </Container>
    );
};

export default TestStatistic;