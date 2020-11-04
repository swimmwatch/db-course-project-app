import * as React from "react";
import Container from "react-bootstrap/Container";
import TableStatistic from "../../components/TableStatistic";
import { withRouter } from "react-router-dom";
import * as attemptService from "../../../../services/attempt";
import ReactRouterPropTypes from "react-router-prop-types";

class TestStatistic extends React.Component {
    constructor(props) {
        super(props);

        // get attempt id from url params
        const { location } = props;
        let query = new URLSearchParams(location.search);

        const testId = parseInt(query.get("id"));

        this.state = {
            data: [],
            testId
        };
    }

    async componentDidMount() {
        const { testId } = this.state;

        try {
            const data = await attemptService.getOwnTestAttempts(testId);

            this.setState({ data });
        } catch (err) {
            console.error(err);
        }
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

TestStatistic.propTypes = {
    location: ReactRouterPropTypes.location
};

export default withRouter(TestStatistic);