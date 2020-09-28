import {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    OK
} from "http-status-codes";
import FormListErrors from "../helpers/FormListErrors";
import * as jwt from "jsonwebtoken";
import User from "../models/User";

export const signup = async (req, res) => {
    const { login, ...credentials } = req.body;
    const formListErrors = new FormListErrors();

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        formListErrors.addDefault();

        res.status(INTERNAL_SERVER_ERROR).json(formListErrors.data);
    }

    if (user !== null) {
        formListErrors.add("User with such name already exists.");

        res.status(BAD_REQUEST).json(formListErrors.data);
    } else {
        try {
            await User.create(
                { ...credentials, login },
                { repeatPassword: credentials.repeatPassword });
        } catch (ex) {
            formListErrors.addFromModelErrors(ex.errors);

            res.status(BAD_REQUEST).json(formListErrors.data);
        }

        res.status(OK);
    }
};

export const signin = async (req, res) => {
    const { login, ...credentials } = req.body;
    const formListErrors = new FormListErrors();

    let user;
    try {
        user = await User.findOne({ where: { login } });
    } catch (error) {
        formListErrors.addDefault();

        res.status(INTERNAL_SERVER_ERROR).json(formListErrors.data);
    }

    if (!user) {
        formListErrors.add("User with such name not found.");

        res.sendStatus(BAD_REQUEST).json(formListErrors.data);
    } else {
        const isRightPassword = await user.comparePasswords(credentials.password);

        if (isRightPassword) {
            const token = jwt.sign({
                userId: user.id,
                role: ['user'] }, process.env.JWT_SECRET);

            res.send(token);
        } else {
            formListErrors.add("Login or password is invalid");

            res.status(BAD_REQUEST).json(formListErrors.data);
        }
    }
};