import * as React from "react";
import Container from "react-bootstrap/Container";
import ListTestCards from "../../components/ListTestCards";
import * as editTest from "../../../../services/editTest";

import "./style.scss";
import HttpErrorInfo from "../../components/HttpErrorInfo";
import {NO_CONTENT} from "http-status-codes";

class ProfileTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileTests: []
        };

        this.handleDeleteTestCard = this.handleDeleteTestCard.bind(this);
    }

    async handleDeleteTestCard(testId) {
        await editTest.deleteTest(testId);

        // delete test card from list
        this.setState(prev => {
            const { profileTests } = prev;

            const delI = profileTests.map(test => test.testId)
                                     .indexOf(testId);

            return {
                profileTests: [
                    ...profileTests.slice(0, delI),
                    ...profileTests.slice(delI + 1),
                ]
            }
        });
    }

    async componentDidMount() {
        const responseJson = await editTest.getOwnTests();

        this.setState({ profileTests: responseJson });
    }

    render() {
        const { profileTests } = this.state;

        return (
            <Container className="p-3">
                {
                    profileTests.length ? (
                        <ListTestCards tests={profileTests}
                                       onDeleteTestCard={this.handleDeleteTestCard}/>
                    ) : (
                        <HttpErrorInfo status={NO_CONTENT}
                                       reason="You don't have tests." />
                    )
                }
            </Container>
        );
    }
}

export default ProfileTests;