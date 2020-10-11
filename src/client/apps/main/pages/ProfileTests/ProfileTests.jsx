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
                <ListTestCards tests={profileTests}/>
            </Container>
        );
    }
}

export default ProfileTests;