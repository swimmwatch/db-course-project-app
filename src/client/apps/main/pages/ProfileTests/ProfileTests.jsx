import * as React from "react";
import Container from "react-bootstrap/Container";
import ListTestCards from "../../components/ListTestCards";
import * as editTest from "../../../../services/editTest";

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
        try {
            await editTest.deleteTest(testId);
        } catch (err) {
            console.error(err);
        }

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
        let responseJson = null;
        try {
            responseJson = await editTest.getOwnTests();
        } catch (err) {
            console.error(err);
        }

        this.setState({
            profileTests: responseJson
        });
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