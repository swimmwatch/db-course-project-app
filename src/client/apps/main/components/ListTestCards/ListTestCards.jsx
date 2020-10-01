import * as React from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestCard from "../TestCard";

const ListTestCards = ({ tests }) => {
    return (
        <Container className="p-3">
            <Row>
                {
                    tests.map((el, i) => {
                        const { title, description, author } = el;

                        return (
                            <Col lg={12} key={i}>
                                <TestCard title={title} description={description} author={author} />
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    );
};

ListTestCards.propTypes = {
    tests: PropTypes.array
};

export default ListTestCards;
