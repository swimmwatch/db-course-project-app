import Attempt from "../models/Attempt";
import Test from "../models/Test";

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