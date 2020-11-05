import * as React from "react";
import PropTypes from "prop-types";
import { getStatusText } from "http-status-codes";

import "./style.scss";

const HttpErrorInfo = ({ status, reason }) => {
    const reasonText = reason ? reason : getStatusText(status);

    return (
        <div className="http-error-info">
            <div className="http-error-info__box">
                <h3 className="http-error-info__status">{status}</h3>
                <p className="http-error-info__reason">{reasonText}</p>
            </div>
        </div>
    );
};

HttpErrorInfo.propTypes = {
    status: PropTypes.number,
    reason: PropTypes.string
}

export default HttpErrorInfo;