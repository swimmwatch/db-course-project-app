import {BAD_REQUEST, FORBIDDEN} from "http-status-codes";
import * as jwt from "jsonwebtoken";

import User from "../models/User";

export const signup = async (req, res, next) => {
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
        const password = await User.hashPassword(credentials.password);

        await User.create({ ...credentials, password, login });

        res.json("success");
    }
};

export const signin = async (req, res, next) => {
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
        const isRightPassword = await User.comparePasswords(credentials.password, user.password);

        if (isRightPassword) {
            const token = jwt.sign({
                userId: user.id,
                role: ['user'] }, process.env.JWT_SECRET);

            res.send(token);
        } else {
            next({
                status: BAD_REQUEST,
                message: "Login or password is invalid"
            });
        }
    }
};