import Test from "../models/Test";
import User from "../models/User";
import {BAD_REQUEST, FORBIDDEN, OK} from "http-status-codes";

export const update = async (req, res) => {
    res.send();
};

export const create = async (req, res, next) => {
    const { userId } = req;
    const { info } = req.body;
    const content = req.body.questions;
    const { title, description /*,tags*/ } = info;

    try {
        await Test.create({
            title,
            description,
            // tags,
            content,
            userId
        });
    } catch ({ errors }) {
        next({
            status: BAD_REQUEST,
            errors
        });
    }

    res.sendStatus(OK);
};

export const getOwnTests = async (req, res, next) => {
    const { userId } = req;


    if (userId) {
        const tests = await Test.findAll({
            where: { userId },
            include: User
        });

        const response = tests.map(test => {
            const { title, description } = test;
            const { login } = test.user;

            return {
                title,
                description,
                author: login
            };
        });

        res.json(response);
    } else {
        next({
            status: FORBIDDEN,
            errors: [{
                message: "something went wrong"
            }]
        });
    }
};