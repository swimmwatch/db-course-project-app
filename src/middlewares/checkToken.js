import * as jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const token = req.headers["authorization"];

    let tokenObj = null;
    try {
        tokenObj = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error(err);
    }

    req.userId = tokenObj.sub;

    next();
};