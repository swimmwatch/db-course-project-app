import * as React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import TestCard from "../TestCard";

import "./style.scss";

const ListTestCards = ({ tests }) => {
    return (
        <Row>
            {
                tests.map((test, i) => {
                    const { title, description, author, tags } = test;

                    return (
                        <TestCard title={title}
                                  description={description}
                                  author={author}
                                  tags={tags}
                                  key={i} />
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
