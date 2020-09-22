import * as React from "react";
import PropType from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./style.scss";

const TestCard = ({ title, description }) => {
    return (
        <Card className="test-card">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button className="test-card__pass-btn"
                        variant="primary">Pass test</Button>
            </Card.Body>
        </Card>
    );
};

TestCard.propTypes = {
    title: PropType.string,
    description: PropType.string
};

export default TestCard;