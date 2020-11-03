import * as React from "react";
import Container from "react-bootstrap/Container";
import ListTestCards from "../../components/ListTestCards";
import * as editTest from "../../../../services/editTest";
import HttpErrorInfo from "../../components/HttpErrorInfo";
import {NO_CONTENT} from "http-status-codes";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import "./style.scss";

class ProfileTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileTests: [],
            searchTitle: '',
            searchTagValue: '',
            searchTags: []
        };

        this.handleDeleteTestCard = this.handleDeleteTestCard.bind(this);
        this.handleSearchTitleChange = this.handleSearchTitleChange.bind(this);
        this.handleSearchTagValueChange = this.handleSearchTagValueChange.bind(this);
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

    handleSearchTitleChange({ target }) {
        const { value } = target;

        this.setState({ searchTitle: value });
    }

    handleSearchTagValueChange({ target }) {
        const { value } = target;

        this.setState({ searchTagValue: value })
    }

    async componentDidMount() {
        const responseJson = await editTest.getOwnTests();

        this.setState({ profileTests: responseJson });
    }

    render() {
        const { profileTests } = this.state;

        return (
            <Container className="p-3">
                <Form>
                    <Form.Group controlId="">
                        <Form.Label>Test title:</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="test title"
                                aria-describedby="basic-addon2"
                                required
                                onChange={this.handleSearchTitleChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary">Find</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>Tags:</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                required
                                onChange={this.handleTagInputChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary"
                                        onClick={()=>{}}>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
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