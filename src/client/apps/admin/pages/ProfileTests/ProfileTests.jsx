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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagList from "../../components/TagList";

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
        this.handleAddingTag = this.handleAddingTag.bind(this);
        this.handleSearchTagDeleting = this.handleSearchTagDeleting.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
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
            };
        });
    }

    handleSearchTagDeleting(tagId) {
        this.setState(prev => {
            const { searchTags } = prev;

            return {
                searchTags: [
                    ...searchTags.slice(0, tagId),
                    ...searchTags.slice(tagId + 1),
                ]
            };
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

    handleAddingTag() {
        const { searchTagValue, searchTags } = this.state;
        const tagIsNotIncluded = !searchTags.includes(searchTagValue);

        if (searchTagValue && tagIsNotIncluded) {
            this.setState(prev => {
                return {
                    searchTags: [...prev.searchTags, searchTagValue]
                };
            });
        }
    }

    async componentDidMount() {
        const responseJson = await editTest.getOwnTests();

        this.setState({ profileTests: responseJson });
    }

    searchFilter() {
        const { profileTests, searchTags, searchTitle } = this.state;

        return profileTests.filter(({ tags, title }) => {
            const containAllTags = tags.some(tag => searchTags.includes(tag));
            const lowerTitle = title.toLowerCase();
            const lowerSearchTitle = searchTitle.toLowerCase();
            const likeTitle = lowerTitle.indexOf(lowerSearchTitle) !== -1;

            return (searchTags.length > 0 ? containAllTags : true) && (searchTitle ? likeTitle : true);
        });
    }

    render() {
        const { searchTags } = this.state;
        const profileTests = this.searchFilter();

        return (
            <Container className="p-3">
                <Row>
                    <Col lg={12} style={{ padding: '0' }}>
                        <Form>
                            <Form.Group controlId="">
                                <FormControl
                                    aria-label="test title"
                                    aria-describedby="basic-addon2"
                                    required
                                    placeholder="Enter test title"
                                    onChange={this.handleSearchTitleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        required
                                        placeholder="Enter tag name"
                                        onChange={this.handleSearchTagValueChange}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary"
                                                onClick={this.handleAddingTag}>
                                            Add
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                            <TagList tags={searchTags}
                                     canDelete={true}
                                     deleteTag={this.handleSearchTagDeleting} />
                        </Form>
                    </Col>
                </Row>
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