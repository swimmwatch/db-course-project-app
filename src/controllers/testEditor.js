import Test from "../models/Test";
import {BAD_REQUEST, OK} from "http-status-codes";

export const update = async (req, res) => {
    res.send();
};

export const create = async (req, res, next) => {
    const { user_id } = req;
    const { info } = req.body;
    const content = req.body.questions;
    const { title, description /*,tags*/ } = info;

    try {
        await Test.create({
            title,
            description,
            // tags,
            content,
            userId: user_id
        });
    } catch ({ errors }) {
        next({
            status: BAD_REQUEST,
            errors
        });
    }

    res.sendStatus(OK);
};