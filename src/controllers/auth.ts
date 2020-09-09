import {
    Request,
    Response,
    NextFunction
} from "express";
import {BAD_REQUEST, FORBIDDEN} from "http-status-codes";

import User from "../models/User";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { login, ...credentials } = req.body;

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        console.error(error);

        res.status(FORBIDDEN);
    }

    if (user !== null) {
        next({
            status: BAD_REQUEST,
            message: "User with such name already exists"
        });
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const password = await User.hashPassword(credentials.password);

        await User.create({ ...credentials, password, login });

        res.json("success");
    }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { login, ...credentials } = req.body;

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        console.error(error);

        res.status(FORBIDDEN);
    }

    if (!user) {
        next({
            status: BAD_REQUEST,
            message: "User with such name not found"
        });
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isRight = await User.comparePasswords(credentials.password, user.password);

        res.send(isRight);
    }
};