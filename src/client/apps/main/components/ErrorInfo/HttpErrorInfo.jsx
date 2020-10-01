import * as React from "react";
import PropTypes from "prop-types";
import { ReasonPhrases } from "http-status-codes";

import "./style.scss";

const HttpErrorInfo = ({ status, reason }) => {
    const reasonText = reason ? reason : ReasonPhrases[status];

    return (
        <div className="http-error-info">
            <h3 className="http-error-info__status">{status}</h3>
            <p className="http-error-info">{reasonText}</p>
        </div>
    );
};

HttpErrorInfo.propTypes = {
    status: PropTypes.number,
    reason: PropTypes.string
}

export default HttpErrorInfo;