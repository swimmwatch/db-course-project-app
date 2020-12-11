import * as React from "react";
import Container from "react-bootstrap/Container";
import ListTestCards from "../../../../components/ListTestCards";
import * as editTest from "../../../../services/editTest";
import HttpErrorInfo from "../../../../components/HttpErrorInfo";
import {NO_CONTENT} from "http-status-codes";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagList from "../../../../components/TagList";

class AllTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
            searchTitle: '',
            searchTagValue: '',
            searchTags: []
        };

        this.handleSearchTitleChange = this.handleSearchTitleChange.bind(this);
        this.handleSearchTagValueChange = this.handleSearchTagValueChange.bind(this);
        this.handleAddingTag = this.handleAddingTag.bind(this);
        this.handleSearchTagDeleting = this.handleSearchTagDeleting.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
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
        const responseJson = await editTest.getAllTests();

        this.setState({ tests: responseJson });
    }

    searchFilter() {
        const { tests, searchTags, searchTitle } = this.state;

        return tests.filter(({ tags, title }) => {
            const containSomeTags = tags.some(tag => searchTags.includes(tag));
            const lowerTitle = title.toLowerCase();
            const lowerSearchTitle = searchTitle.toLowerCase();
            const likeTitle = lowerTitle.indexOf(lowerSearchTitle) !== -1;

            return (searchTags.length > 0 ? containSomeTags : true) &&
                (searchTitle ? likeTitle : true);
        });
    }

    render() {
        const { searchTags } = this.state;
        const tests = this.searchFilter();

        return (
            <Container className="p-3">
                <Row>
                    <Col lg={12} style={{ padding: '0' }}>
                        <Form>
                            <Form.Group controlId="test-search-title">
                                <FormControl
                                    aria-label="Test searching title field"
                                    placeholder="Enter test title"
                                    required
                                    onChange={this.handleSearchTitleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="test-search-tag-value">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        aria-label="Test searching tag value"
                                        placeholder="Enter tag name"
                                        required
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
                    tests.length ? (
                        <ListTestCards tests={tests}
                                       editMenu={false} />
                    ) : (
                        <HttpErrorInfo status={NO_CONTENT}
                                       reason="You don't have tests." />
                    )
                }
            </Container>
        );
    }
}

export default AllTests;