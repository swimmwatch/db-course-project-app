import * as React from "react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import "./style.scss";

const ResultStatus = ({ isCorrect }) => {
    return (
        <span className={`result-status ${isCorrect ? 'result-status__correct' : 'result-status__incorrect'}`}>
            <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} />
        </span>
    );
};

ResultStatus.propTypes = {
    isCorrect: PropTypes.bool.isRequired
};

export default ResultStatus;