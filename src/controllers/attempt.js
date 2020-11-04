import Attempt from "../models/Attempt";
import Test from "../models/Test";
import User from "../models/User";

export const getOwnAttempts = async (req, res) => {
    const { userId } = req;

    const ownAttempts = await Attempt.findAll({
        where: { userId },
        include: [Test]
    });

    // collect response
    const response = [];
    for (let attempt of ownAttempts) {
        const { createdAt, result } = attempt;
        const { title, id: testId } = attempt.test;

        response.push({
            title,
            result,
            testId,
            date: createdAt,
        });
    }

    res.json(response);
};

export const getOwnTestAttempts = async (req, res) => {
    const { userId } = req;
    let { id } = req.query;
    const testId = parseInt(id);

    const ownAttempts = await Attempt.findAll({
        where: { userId, testId },
        include: [Test, User]
    });

    // collect response
    const response = [];
    for (let attempt of ownAttempts) {
        const { createdAt, result, id } = attempt;
        const { id: testId } = attempt.test;
        const { login } = attempt.user;

        response.push({
            login,
            result,
            testId,
            attemptId: id,
            date: createdAt,
        });
    }

    res.json(response);
};