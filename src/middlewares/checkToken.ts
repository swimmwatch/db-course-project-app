import {
    Request,
    Response,
    NextFunction
} from "express";
import * as jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["authorization"];

    const tokenObj = await jwt.verify(token as string, process.env.JWT_SECRET as string);

    console.log(tokenObj);

    next();
};