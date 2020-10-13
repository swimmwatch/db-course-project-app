import Test from "../models/Test";
import User from "../models/User";
import Tag from "../models/Tag";
import TestTag from "../models/TestTag";
import {BAD_REQUEST, OK} from "http-status-codes";

export const update = async (req, res, next) => {
    const { userId } = req;
    const { info, testId } = req.body;
    const content = req.body.questions;
    const { title, description, tags } = info;

    // create new tags
    const createdTags = [];
    try {
        for (let tagName of tags) {
            const newTag = await Tag.create({ name: tagName });
            createdTags.push(newTag);
        }
    } catch (err) {
        console.error(err);

        // TODO: handle case if something wrong with creating tags
    }

    const currTest = await Test.findByPk(testId);

    if (!currTest) {
        // TODO: handle case if test not found
    }

    if (userId !== currTest.userId) {
        // TODO: handle case if not true creator
    }

    try {
        // update current test
        await currTest.update({
            title,
            description,
            content,
        });

    } catch (err) {
        // TODO: handle case if something wrong with updating

        console.log(err);

        next({
            status: BAD_REQUEST,
            errors: err.errors
        });
    }

    try {
        // update link from tags to tests
        for (let currTag of createdTags) {
            await TestTag.create({
                testId: currTest.id,
                tagId: currTag.id
            });
        }
    } catch (err) {
        // TODO: handle case if something wrong with adding in test_tag table
        console.log(err);
    }

    res.sendStatus(OK);
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
    const { userId } = req;

    const test = await Test.findByPk(testId, {
        include: User
    });

    if (!test) {
        // TODO: handle if test not found
    }

    if (test.userId === userId) {
        await Test.destroy({
            where: {
                id: testId
            }
        });

        res.sendStatus(OK);
    } else {
        // TODO: handle if testId != test.id
    }
};

export const getTestForEdit = async (req, res) => {
    const { testId } = req.body;
    const { userId } = req;

    const test = await Test.findByPk(testId, {
        include: [User, Tag]
    });

    if (!test) {
        // TODO: handle if test not found
    }

    if (test.userId === userId) {
        const tags = await test.getTags();
        const { title, description, content } = test;

        res.json({
            info: {
                title,
                description,
                tags: tags.map(tag => tag.name)
            },
            questions: content
        });
    } else {
        // TODO: handle if testId != test.id
    }
};