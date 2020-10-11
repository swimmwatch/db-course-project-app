import * as React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as testEditorActions from "../../../../actions/testEditor";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import TestEditorTagList from "../../../../containers/TestEditorTagList";
import TestEditorQuestionList from "../../../../containers/TestEditorQuestionList";
import ErrorFormAlert from "../../components/ErrorFormAlert";
import {createHeaderWithAuth} from "../../../../helpers/header";
import {ANSWER_TYPE} from "../../components/AnswerEditList/config";

import "./style.scss";

class TestEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagValue: '',
            listErrors: [],
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAppendTag = this.handleAppendTag.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.handleAppendQuestion = this.handleAppendQuestion.bind(this);
        this.hideErrorAlert = this.hideErrorAlert.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch, location } = this.props;

        let query = new URLSearchParams(location.search);

        const id = query.get("id");

        if (id) {
            // TODO: handle request
            console.log(id);
        } else {
            dispatch(testEditorActions.reset());
        }
    }

    handleTitleChange({ target: { value } }) {
        const { dispatch } = this.props;

        dispatch(testEditorActions.updateTitle(value));
    }

    handleDescriptionChange({ target: { value } }) {
        const { dispatch } = this.props;

        dispatch(testEditorActions.updateDescription(value));
    }

    handleTagInputChange({ target: { value } }) {
        this.setState({ tagValue: value });
    }

    handleAppendTag() {
        const { tagValue } = this.state;
        const { dispatch } = this.props;

        dispatch(testEditorActions.appendTag(tagValue));
    }

    handleAppendQuestion(event) {
        event.preventDefault();

        const { dispatch } = this.props;

        dispatch(testEditorActions.appendQuestion());
    }

    hideErrorAlert() {
        this.setState({
            listErrors: []
        });
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const { history, testEditor } = this.props;
        const token = localStorage.getItem('TOKEN');
        const headers = createHeaderWithAuth(token);

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const response = await fetch('/api/test/create', {
            method: 'POST',
            body: JSON.stringify(testEditor),
            headers,
        });

        if (response.ok) {
            history.push('/profile/tests');
        } else {
            const responseJson = await response.json();

            this.setState({
                listErrors: responseJson.errors
            });
        }
    }

    render() {
        const { listErrors } = this.state;

        return (
            <Container className="p-3">
                <Row>
                    <Col lg={{offset: 2, span: 8}}>
                        <ErrorFormAlert listErrors={listErrors}
                                        show={listErrors.length !== 0}
                                        onHide={this.hideErrorAlert} />
                        <Form>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Title:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <Form.Control required
                                                      onChange={this.handleTitleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Description:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <Form.Control className="test-editor__textarea"
                                                      as="textarea"
                                                      rows={3}
                                                      required
                                                      onChange={this.handleDescriptionChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <Form.Label>Tags:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group controlId="">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                required
                                                onChange={this.handleTagInputChange}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="primary"
                                                        onClick={this.handleAppendTag}>
                                                    Add
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <TestEditorTagList />
                                </Col>
                            </Row>

                            <hr/>

                            <TestEditorQuestionList />

                            <Row>
                                <Col lg={12}>
                                    <div className="test-editor__submit-section">
                                        <div className="test-editor__submit-section-row">
                                            <Button className="test-editor__submit-btn"
                                                    type="primary"
                                                    size="lg"
                                                    onClick={this.handleAppendQuestion}>
                                                Add question
                                            </Button>
                                        </div>
                                        <div className="test-editor__submit-section-row">
                                            <Button className="test-editor__submit-btn"
                                                    type="primary"
                                                    size="lg" onClick={this.handleFormSubmit}>
                                                Publish
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

TestEditor.propTypes = {
    dispatch: PropTypes.func,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location,
    testEditor: PropTypes.exact({
        info: PropTypes.exact({
            title: PropTypes.string,
            description: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string)
        }),
        questions: PropTypes.arrayOf(
            PropTypes.exact({
                title: PropTypes.string,
                typeAnswer: PropTypes.oneOf([ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE]),
                answers: PropTypes.arrayOf(
                    PropTypes.exact({
                        content: PropTypes.string,
                        isRight: PropTypes.bool
                    })
                )
            })
        )
    }).isRequired
};

function mapStateToProps(state) {
    const { testEditor } = state;

    return { testEditor };
}

const connectedTestEditor = connect(mapStateToProps)(withRouter(TestEditor));

export { connectedTestEditor as TestEditor };