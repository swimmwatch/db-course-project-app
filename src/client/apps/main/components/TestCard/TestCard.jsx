import * as React from "react";
import PropType from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import TagList from "../TagList";

import "./style.scss";

const TestCard = ({ title, description, author, tags }) => {
    return (
        <Card className="test-card">
            <Card.Body>
                <Card.Title className="test-card__title">{title}</Card.Title>

                <div className="test-card__author">
                    <span className="test-card__label-info">Author:</span> {author}
                </div>

                <div className="test-card__tags">
                    <span className="test-card__label-info">Tags:</span>
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
                    <Button className="test-card__pass-btn"
                            variant="primary">Pass test</Button>

                    <Dropdown className="test-card__dropdown-menu">
                        <Dropdown.Toggle variant="primary">Menu</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as="button">Edit</Dropdown.Item>
                            <Dropdown.Item as="button">Delete</Dropdown.Item>
                            <Dropdown.Item as="button">Share</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Card.Body>
        </Card>
    );
};

TestCard.propTypes = {
    title: PropType.string.isRequired,
    description: PropType.string.isRequired,
    author: PropType.string.isRequired,
    tags: PropType.arrayOf(PropType.string).isRequired
};

export default TestCard;