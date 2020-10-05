import { INTERNAL_SERVER_ERROR } from "http-status-codes";

// eslint-disable-next-line no-unused-vars
export default function(err, req, res, next) {
    let { status, errors } = err;

    if (!status) {
        status = INTERNAL_SERVER_ERROR;
    }

    res.status(status).json({ errors });
}