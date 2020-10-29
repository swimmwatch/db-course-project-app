import {
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK
} from "http-status-codes";
import Test from "../models/Test";
import User from "../models/User";
import Tag from "../models/Tag";
import TestTag from "../models/TestTag";
import Attempt from "../models/Attempt";
import FormListErrors from "../helpers/FormListErrors";
import { zipWith, zip } from "lodash";

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
        formListErrors.addDefault();

        next({
            status: INTERNAL_SERVER_ERROR,
            errors: formListErrors.data.errors
        });
    }

    if (userId !== currTest.userId) {
        formListErrors.addDefault();

        next({
            status: FORBIDDEN,
            errors: formListErrors.data.errors
        });
    }

    try {
        // update current test
        await currTest.update({
            title,
            description,
            content,
        });

    } catch (err) {
        formListErrors.addFromModelErrors(err.errors);

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
        formListErrors.addFromModelErrors(err.errors);

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
        });
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
    const formListErrors = new FormListErrors();

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
        formListErrors.addFromModelErrors(err.errors);

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
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
        formListErrors.addFromModelErrors(err.errors);

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
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
    const formListErrors = new FormListErrors();

    const test = await Test.findByPk(testId, {
        include: User
    });

    if (!test) {
        formListErrors.addDefault();

        next({
            status: BAD_REQUEST,
            errors: formListErrors.data.errors
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
        formListErrors.addDefault();

        next({
            status: FORBIDDEN,
            errors: formListErrors.data.errors
        });
    }
};

export const getTestForEdit = async (req, res, next) => {
    const { testId } = req.body;
    const { userId } = req;
    const formListErrors = new FormListErrors();

    const test = await Test.findByPk(testId, {
        include: [User, Tag]
    });

    if (!test) {
        formListErrors.add('test not found');

        next({
            status: NOT_FOUND,
            errors: formListErrors.data.errors
        });
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
        formListErrors.addDefault();

        next({
            status: FORBIDDEN,
            errors: formListErrors.data.errors
        });
    }
};

export const getTestForPassing = async (req, res, next) => {
    let { id } = req.query;
    const testId = parseInt(id);
    // const { userId } = req;
    const formListErrors = new FormListErrors();

    const test = await Test.findByPk(testId, { include: [User] });

    if (!test) {
        formListErrors.add('test not found');

        next({
            status: NOT_FOUND,
            errors: formListErrors.data.errors
        });
    }

    // exclude from answers 'isRight' and add 'isChecked' properties
    const questions = test.content.map(question => {
        const { answers } = question;

        const modifiedAnswers = answers.map(answer => {
            return {
                content: answer.content,
                isChecked: false
            };
        });

        return { ...question, answers: modifiedAnswers };
    });

    res.json(questions);
};

export const check = async (req, res, next) => {
    const { questions: userQuestions, testId } = req.body;
    const { userId } = req;
    const formListErrors = new FormListErrors();

    const test = await Test.findByPk(testId, { include: [User] });

    if (!test) {
        formListErrors.add('test not found');

        next({
            status: NOT_FOUND,
            errors: formListErrors.data.errors
        });
    }

    // count and check answers
    let amountRightQuestions = 0;
    const amountQuestions = test.content.length;
    const userAnswersStates = [];
    zipWith(test.content, userQuestions, (testQuestion, userQuestion) => {
        const { answers: testAnswers } = testQuestion;
        const { answers: userAnswers } = userQuestion;

        const isRight = zip(testAnswers, userAnswers).every(
            ([testAnswer, userAnswer]) => testAnswer.isRight === userAnswer.isChecked
        );

        if (isRight) {
            amountRightQuestions++;
        }

        userAnswersStates.push({ isCorrect: isRight });
    });

    const result = amountRightQuestions / amountQuestions;

    let newAttempt = null;
    try {
        newAttempt = await Attempt.create({
            result,
            userId,
            testId,
            answers: userAnswersStates
        }, {
            include: [User, Test]
        });
    } catch (err) {
        // TODO: handle case if data is invalid

        console.error(err);
    }

    res.json({ attemptId: newAttempt.id });
};

export const getAttemptResults = async (req, res, next) => {
    let { id } = req.query;
    const attemptId = parseInt(id);
    const formListErrors = new FormListErrors();

    const attempt = await Attempt.findByPk(attemptId);

    if (!attempt) {
        formListErrors.add('attempt not found');

        next({
            status: NOT_FOUND,
            errors: formListErrors.data.errors
        });
    }

    res.json({ userAnswers: attempt.answers });
};