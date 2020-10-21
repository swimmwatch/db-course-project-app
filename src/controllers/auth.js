import {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    OK, FORBIDDEN
} from "http-status-codes";
import * as jwt from "jsonwebtoken";
import FormListErrors from "../helpers/FormListErrors";
import User from "../models/User";

export const signUp = async (req, res, next) => {
    const {
        login,
        repeatPassword,
        password,
        email,
    } = req.body;
    const formListErrors = new FormListErrors();

    if (repeatPassword !== password) {
        formListErrors.add("passwords doesn't equal.");

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
    }

    try {
        await User.create({ email, login, password });
    } catch ({ errors }) {
        formListErrors.addFromModelErrors(errors);

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
    }

    res.sendStatus(OK);
};

export const signIn = async (req, res, next) => {
    const {
        login,
        password,
    } = req.body;
    const formListErrors = new FormListErrors();

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        formListErrors.addDefault();

        next({
            status: INTERNAL_SERVER_ERROR,
            errors: formListErrors.data.errors
        });
    }

    if (!user) {
        formListErrors.add("user with such name not found.");

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
    } else {
        const isRightPassword = await user.comparePasswords(password);

        if (isRightPassword) {
            const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

            res.json({
                ...user.initState(),
                token
            });
        } else {
            formListErrors.add("password is invalid");

            next({
                status: BAD_REQUEST,
                errors: formListErrors.data.errors
            });
        }
    }
};

export const initAuth = async (req, res, next) => {
    const user = await User.findByPk(req.userId);

    if (!user) {
        next({
            status: FORBIDDEN,
            errors: [
                { message: 'user with such id not found' }
            ]
        });
    }

    res.json({ ...user.initState() });
};