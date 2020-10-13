import Test from "../models/Test";
import User from "../models/User";
import Tag from "../models/Tag";
import TestTag from "../models/TestTag";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, OK} from "http-status-codes";
import FormListErrors from "../helpers/FormListErrors";

export const update = async (req, res, next) => {
    const { userId } = req;
    const { info, testId } = req.body;
    const content = req.body.questions;
    const { title, description, tags } = info;
    const formListErrors = new FormListErrors();


    const currTest = await Test.findByPk(testId, {
        include: [Tag]
    });

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

    } catch ({ errors }) {

        formListErrors.addFromModelErrors(errors);

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
    }

    // create new tags
    const currTestTags = [];
    try {
        for (let tagName of tags) {
            const [newTag] = await Tag.findOrCreate({
                where: { name: tagName }
            });

            currTestTags.push(newTag);
        }
    } catch (err) {
        console.error(err);

        // TODO: handle case if something wrong with creating tags
    }

    const ownTestTags = await TestTag.findAll({
        where: {
            testId
        },
        include: [Tag]
    });

    // find and delete tags that don't need anymore
    const notExistTagIds = ownTestTags.filter(tag => !tags.includes(tag.name))
                                      .map(tag => tag.tagId);

    await TestTag.destroy({
        where: {
            testId: currTest.id,
            tagId: notExistTagIds
        },
        force: true
    });

    // update link from tags to tests
    for (let currTag of currTestTags) {
        await TestTag.findOrCreate({
            where: {
                testId: currTest.id,
                tagId: currTag.id
            }
        });
    }

    res.sendStatus(OK);
};

export const create = async (req, res, next) => {
    const { userId } = req;
    const { info } = req.body;
    const content = req.body.questions;
    const { title, description, tags } = info;

    // create new test
    let newTest = null;
    try {
        newTest = await Test.create({
            title,
            description,
            content,
            userId,
        }, { include: [Tag] });
    } catch (err) {
        console.error(err);

        next({
            status: BAD_REQUEST,
            errors: err.errors
        });
    }

    // create or find tags
    const currTestTags = [];
    try {
        for (let currTagName of tags) {
            const [newTag] = await Tag.findOrCreate({
                where: {
                    name: currTagName
                }
            });

            currTestTags.push(newTag);
        }
    } catch (err) {
        console.error(err);

        next({
            status: BAD_REQUEST,
            errors: err.errors
        });
    }

    // create link from tags to tests
    for (let currTag of currTestTags) {
        await TestTag.findOrCreate({
            where: {
                testId: newTest.id,
                tagId: currTag.id
            }
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

export const deleteTest = async (req, res, next) => {
    const { testId } = req.body;
    const { userId } = req;

    const test = await Test.findByPk(testId, {
        include: User
    });

    if (!test) {
        next({
            status: INTERNAL_SERVER_ERROR,
            errors: [{
                message: 'something went wrong'
            }]
        });
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