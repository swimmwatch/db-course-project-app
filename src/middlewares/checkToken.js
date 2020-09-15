import * as jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const token = req.headers["authorization"];

    const tokenObj = await jwt.verify(token, process.env.JWT_SECRET);

    console.log(tokenObj);

    next();
};