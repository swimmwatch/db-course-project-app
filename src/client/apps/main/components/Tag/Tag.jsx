import * as React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import "./style.scss";

const Tag = ({ content, onDelete, canDelete }) => {
    return (
        <li className="tag">
            <span className="tag__content">{content}</span>
            {
                canDelete && (
                    <button className="tag__delete-btn"
                            onClick={event => {
                                event.preventDefault();
                                onDelete();
                            }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )
            }
        </li>
    );
};

Tag.propTypes = {
    content: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
};

export default Tag;