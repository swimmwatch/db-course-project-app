import * as React from "react";
import PropType from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faTags,
    faTrash,
    faEdit,
    faShareSquare,
    faPollH
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import TagList from "../TagList";

import "./style.scss";

const TestCard = ({
      title,
      description,
      author, tags,
      onDeleteTestCard,
      testId,
      editMenu=true
}) => {
    return (
        <Card className="test-card">
            <Card.Body>
                <Card.Title className="test-card__title">{title}</Card.Title>

                <div className="test-card__author">
                    <span className="test-card__label-info">
                        <FontAwesomeIcon icon={faUser} /> Author:
                    </span>
                    {author}
                </div>

                <div className="test-card__tags">
                    <span className="test-card__label-info">
                        <FontAwesomeIcon icon={faTags} /> Tags:
                    </span>
                    {
                        tags.length ? (
                            <TagList tags={tags} canDelete={false} />
                        ) : (
                            "None"
                        )
                    }
                </div>

                <Card.Text className="test-card__description">{description}</Card.Text>
                    <div className="test-card__control">
                        <LinkContainer to={`/test/pass?id=${testId}`}>
                            <Button className="test-card__pass-btn"
                                    variant="primary">Pass test</Button>
                        </LinkContainer>

                    {
                        editMenu && (
                            <Dropdown className="test-card__dropdown-menu">
                                <Dropdown.Toggle variant="primary">Menu</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <LinkContainer to={`/test/edit?id=${testId}`}>
                                        <Dropdown.Item as="button">
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Dropdown.Item>
                                    </LinkContainer>
                                    <Dropdown.Item as="button"
                                                   onClick={() => {
                                                       onDeleteTestCard(testId);
                                                   }}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={async () => {
                                        const link = `${location.origin}/test/pass?id=${testId}`;

                                        try {
                                            await navigator.clipboard.writeText(link);

                                            alert("Link has been copied!");
                                        } catch (err) {
                                            alert('Could not copy link.');
                                        }
                                    }}>
                                        <FontAwesomeIcon icon={faShareSquare} /> Share
                                    </Dropdown.Item>
                                    <LinkContainer to={`/test/statistic?id=${testId}`}>
                                        <Dropdown.Item as="button">
                                            <FontAwesomeIcon icon={faPollH} /> Show results
                                        </Dropdown.Item>
                                    </LinkContainer>
                                </Dropdown.Menu>
                            </Dropdown>
                            )
                        }
                        </div>
            </Card.Body>
        </Card>
    );
};

TestCard.propTypes = {
    title: PropType.string.isRequired,
    description: PropType.string.isRequired,
    author: PropType.string.isRequired,
    tags: PropType.arrayOf(PropType.string).isRequired,
    testId: PropType.number.isRequired,
    onDeleteTestCard: PropType.func,
    editMenu: PropType.bool
};

export default TestCard;