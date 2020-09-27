import {BAD_REQUEST, FORBIDDEN, OK} from "http-status-codes";
import * as jwt from "jsonwebtoken";

import User from "../models/User";

export const signup = async (req, res) => {
    const { login, ...credentials } = req.body;

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        console.error(error);

        res.sendStatus(FORBIDDEN);
    }

    if (user !== null) {
        res.sendStatus(BAD_REQUEST).json({
            status: BAD_REQUEST,
            message: "User with such name already exists"
        });
    } else {
        const password = await User.hashPassword(credentials.password);

        await User.create({ ...credentials, password, login });

        res.sendStatus(OK);
    }
};

export const signin = async (req, res) => {
    const { login, ...credentials } = req.body;

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        console.error(error);

        res.sendStatus(FORBIDDEN);
    }

    if (!user) {
        res.sendStatus(BAD_REQUEST).json({
            status: BAD_REQUEST,
            message: "User with such name not found"
        });
    } else {
        const isRightPassword = await user.comparePasswords(credentials.password);

        if (isRightPassword) {
            const token = jwt.sign({
                userId: user.id,
                role: ['user'] }, process.env.JWT_SECRET);

            res.send(token);
        } else {
            res.sendStatus(BAD_REQUEST).json({
                status: BAD_REQUEST,
                message: "Login or password is invalid"
            });
        }
    }
};