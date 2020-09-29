import {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    OK
} from "http-status-codes";
import * as jwt from "jsonwebtoken";
import FormListErrors from "../helpers/FormListErrors";
import User from "../models/User";

export const signUp = async (req, res) => {
    const {
        login,
        repeatPassword,
        password,
        email,
    } = req.body;
    const formListErrors = new FormListErrors();

    try {
        await User.create(
            { email, login, password },
            { repeatPassword });
    } catch (ex) {
        formListErrors.addFromModelErrors(ex.errors);

        res.status(BAD_REQUEST).json(formListErrors.data);
    }

    res.sendStatus(OK);
};

export const signIn = async (req, res) => {
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

        res.status(INTERNAL_SERVER_ERROR).json(formListErrors.data);
    }

    if (!user) {
        formListErrors.add("user with such name not found.");

        res.status(BAD_REQUEST).json(formListErrors.data);
    } else {
        const isRightPassword = await user.comparePasswords(password);

        if (isRightPassword) {
            const token = jwt.sign({
                userId: user.id,
                role: ['user'] }, process.env.JWT_SECRET);

            res.send(token);
        } else {
            formListErrors.add("password is invalid");

            res.status(BAD_REQUEST).json(formListErrors.data);
        }
    }
};