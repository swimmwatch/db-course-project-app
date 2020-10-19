import * as jwt from "jsonwebtoken";
import {FORBIDDEN} from "http-status-codes";

export default async (req, res, next) => {
    const token = req.headers["authorization"];

    let tokenObj = null;
    try {
        tokenObj = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        next({
            status: FORBIDDEN,
            errors: [{
                message: "something went wrong"
            }]
        });
    }

    req.userId = tokenObj.sub;

    next();
};