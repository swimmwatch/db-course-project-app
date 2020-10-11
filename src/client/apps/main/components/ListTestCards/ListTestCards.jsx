import * as React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestCard from "../TestCard";

import "./style.scss";

const ListTestCards = ({ tests }) => {
    return (
        <Row>
            {
                tests.map((el, i) => {
                    const { title, description, author } = el;

                    return (
                        <Col lg={12} key={i} className="list-tests__col">
                            <TestCard title={title} description={description} author={author} />
                        </Col>
                    );
                })
            }
        </Row>
    );
};

ListTestCards.propTypes = {
    tests: PropTypes.array
};

export default ListTestCards;
