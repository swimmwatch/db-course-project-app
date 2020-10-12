import * as React from "react";
import Container from "react-bootstrap/Container";
import ListTestCards from "../../components/ListTestCards";
import {createHeaderWithAuth} from "../../../../helpers/header";

import "./style.scss";

class ProfileTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileTests: []
        };

        this.handleDeleteTestCard = this.handleDeleteTestCard.bind(this);
    }

    async handleDeleteTestCard(testId) {
        const token = localStorage.getItem('TOKEN');
        const headers = createHeaderWithAuth(token);

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`/api/test/delete`, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ testId })
        });

        if (response.ok) {
            this.setState(prev => {
                const { profileTests } = prev;

                const delI = profileTests.map(test => test.testId).indexOf(testId);

                return {
                    profileTests: [
                        ...profileTests.slice(0, delI),
                        ...profileTests.slice(delI + 1),
                    ]
                }
            });
        } else {
            // TODO: handle if something went wrong
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('TOKEN');
        const headers = createHeaderWithAuth(token);

        const response  = await fetch('/api/test/profile', {
            method: 'GET',
            headers
        });

        if (response.ok) {
            const responseJson = await response.json();

            this.setState({
                profileTests: responseJson
            });
        } else {
            // TODO: handle if something wrong
        }
    }

    render() {
        const { profileTests } = this.state;

        return (
            <Container className="p-3">
                <ListTestCards tests={profileTests}
                               onDeleteTestCard={this.handleDeleteTestCard}/>
            </Container>
        );
    }
}

export default ProfileTests;