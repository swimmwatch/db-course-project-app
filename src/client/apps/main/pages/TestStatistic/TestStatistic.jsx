import * as React from "react";
import Container from "react-bootstrap/Container";
import TableStatistic from "../../components/TableStatistic";

class TestStatistic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        console.log('hello');
    }

    render() {
        const { data } = this.state;

        return (
            <Container className="p-3">
                <TableStatistic rows={data} />
            </Container>
        );
    }
}

export default TestStatistic;