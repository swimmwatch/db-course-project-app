import * as React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import * as attemptsService from "../../../../services/attempt";

import "./style.scss";

class ProfileAttempts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attempts: []
        };
    }

    async componentDidMount() {
        try {
            const attempts = await attemptsService.getOwnAttempts();

            this.setState({ attempts });
        } catch (err) {
            // TODO: handle error

            console.error(err);
        }
    }

    render() {
        const { attempts } = this.state;

        return (
            <Container style={{ padding: '15px 0' }}>
                <Table responsive="lg">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Result</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        attempts.map((attempt, i) => {
                            const { title, testId, result, date } = attempt;
                            const link = `/test/pass?id=${testId}`;

                            return (
                                <tr key={i}>
                                    <td>
                                        <Link to={link}>{title}</Link>
                                    </td>
                                    <td>{result * 100}%</td>
                                    <td>
                                        <time dateTime={date}>{date}</time>
                                    </td>
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

export default ProfileAttempts;