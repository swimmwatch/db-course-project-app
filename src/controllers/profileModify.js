import User from "../models/User";
import {OK} from "http-status-codes";

export const updatePassword = async (req, res) => {
    res.end();
};

export const remove = async (req, res) => {
    const { user_id } = req;

    const user = await User.findByPk(user_id);

    user.destroy();

    res.sendStatus(OK);
};