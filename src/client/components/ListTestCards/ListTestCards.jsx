import * as React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import TestCard from "../TestCard";

import "./style.scss";

const ListTestCards = ({ tests, editMenu=true, onDeleteTestCard }) => {
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
                                  editMenu={editMenu}
                                  onDeleteTestCard={onDeleteTestCard} />
                    );
                })
            }
        </Row>
    );
};

ListTestCards.propTypes = {
    tests: PropTypes.array.isRequired,
    onDeleteTestCard: PropTypes.func,
    editMenu: PropTypes.bool
};

export default ListTestCards;
