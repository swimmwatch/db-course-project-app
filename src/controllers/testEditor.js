import Test from "../models/Test";
import User from "../models/User";
import Tag from "../models/Tag";
import TestTag from "../models/TestTag";
import {BAD_REQUEST, OK} from "http-status-codes";

export const update = async (req, res) => {
    res.send();
};

export const create = async (req, res, next) => {
    const { userId } = req;
    const { info } = req.body;
    const content = req.body.questions;
    const { title, description, tags } = info;

    try {
        // create new tags
        const createdTags = [];
        for (let tagName of tags) {
            const newTag = await Tag.create({ name: tagName });
            createdTags.push(newTag);
        }

        // create new test
        const newTest = await Test.create({
            title,
            description,
            content,
            userId,
        }, {
            include: Tag
        });

        // create link from tags to tests
        for (let currTag of createdTags) {
            await TestTag.create({
                testId: newTest.id,
                tagId: currTag.id
            });
        }
    } catch (err) {
        console.log(err);

        next({
            status: BAD_REQUEST,
            errors: err.errors
        });
    }

    res.sendStatus(OK);
};

export const getOwnTests = async (req, res) => {
    const { userId } = req;

    const tests = await Test.findAll({
        where: { userId },
        include: [User, Tag]
    });

    const response = [];
    for (let test of tests) {
        const { title, description, id } = test;
        const { login } = test.user;
        const tags = await test.getTags();

        response.push({
            title,
            description,
            tags: tags.map((tag => tag.name)),
            author: login,
            testId: id
        });
    }

    res.json(response);
};

export const deleteTest = async (req, res) => {
    const { testId } = req.body;

    await Test.destroy({
        where: {
            id: testId
        }
    });

    res.sendStatus(OK);
};