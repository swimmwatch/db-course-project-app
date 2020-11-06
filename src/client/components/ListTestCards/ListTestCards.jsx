import * as React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import TestCard from "../TestCard";

import "./style.scss";

const ListTestCards = ({ tests, onDeleteTestCard }) => {
    return (
        <Row>
            {
                tests.map(test => {
                    const {
                        title,
                        description,
                        author,
                        tags,
                        testId
                    } = test;

                    return (
                        <TestCard title={title}
                                  description={description}
                                  author={author}
                                  tags={tags}
                                  key={testId}
                                  testId={testId}
                                  onDeleteTestCard={onDeleteTestCard} />
                    );
                })
            }
        </Row>
    );
};

ListTestCards.propTypes = {
    tests: PropTypes.array,
    onDeleteTestCard: PropTypes.func
};

export default ListTestCards;
