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
    let { id } = req.query;
    const testId = parseInt(id);

    const ownAttempts = await Attempt.findAll({
        where: { testId },
        include: [User]
    });

    // collect response
    const response = [];
    for (let attempt of ownAttempts) {
        const { createdAt, result, id } = attempt;
        const { login } = attempt.user;

        response.push({
            login,
            result,
            attemptId: id,
            date: createdAt,
        });
    }

    res.json(response);
};