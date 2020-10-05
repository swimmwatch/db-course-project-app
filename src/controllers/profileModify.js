import User from "../models/User";
import {BAD_REQUEST, OK} from "http-status-codes";
import FormListErrors from "../helpers/FormListErrors";

export const updatePassword = async (req, res, next) => {
    const formListErrors = new FormListErrors();
    const { user_id } = req;
    const { password, newPassword, repeatNewPassword } = req.body;

    const user = await User.findByPk(user_id);

    const isRightPassword = user.comparePasswords(password);

    if (isRightPassword) {
        if (repeatNewPassword !== newPassword) {
            formListErrors.add("passwords doesn't equal.");

            next({
                status: BAD_REQUEST,
                errors: formListErrors.data.errors
            });
        }

        try {
            await user.update({ password: newPassword }, { repeatPassword: repeatNewPassword });
        } catch ({ errors }) {
            formListErrors.addFromModelErrors(errors);

            next({
                status: BAD_REQUEST,
                errors: formListErrors.data.errors
            });
        }
    } else {
        formListErrors.add('current password is invalid.');

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
    }

    res.sendStatus(OK);
};

export const remove = async (req, res) => {
    const { user_id } = req;

    const user = await User.findByPk(user_id);

    user.destroy();

    res.sendStatus(OK);
};