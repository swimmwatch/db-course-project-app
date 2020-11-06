import * as React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import * as attemptsService from "../../../../services/attempt";
import {NO_CONTENT, OK} from "http-status-codes";

import "./style.scss";
import HttpErrorInfo from "../../../../components/HttpErrorInfo";

class ProfileAttempts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attempts: [],
            requestIsFailed: false,
            failedResponse: {
                status: OK,
                message: ''
            }
        };
    }

    async componentDidMount() {
        try {
            const attempts = await attemptsService.getOwnAttempts();

            this.setState({ attempts });
        } catch (err) {
            const { status, message } = err;

            this.setState({
                requestIsFailed: true,
                failedResponse: {
                    status,
                    message
                }
            });
        }
    }

    render() {
        const { attempts, failedResponse, requestIsFailed } = this.state;

        return (
            <Container style={{ padding: '15px 0' }}>
                {
                    requestIsFailed ? (
                        <HttpErrorInfo status={failedResponse.status}
                                       reason={failedResponse.message} />
                    ) : (
                        attempts.length ? (
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
                        ): (
                            <HttpErrorInfo status={NO_CONTENT}
                                           reason={"You don't have any attempts."} />
                        )
                    )
                }
            </Container>
        );
    }
}

export default ProfileAttempts;