import * as DataTypes from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";
import validate from "validate.js";
import {ANSWER_TYPE} from "../../client/apps/main/components/AnswerEditList/config";

import {
    MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH,
    MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH
} from "./constraints";

const testScheme = {
    title: {
        type: "string",
        presence: true,
        length: { minimum: 1 }
    },
    typeAnswer: {
        type: "string",
        presence: true,
        inclusion: [ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE],
        length: { minimum: 1 }
    },
    answers: {
        type: "array",
        presence: true,
        length: {
            tooShort: "needs to have minimum 2",
            minimum: 2
        }
    }
};

const answerScheme = {
    content: {
        type: "string",
        length: { minimum: 1, tooShort: "needs to have not empty length" },
        presence: true
    },
    isRight: {
        type: "boolean",
        presence: true
    }
};

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Test = sequelize.define("test", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                msg: `title must has length between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH}.`,
                args: [
                    MIN_TITLE_LENGTH,
                    MAX_TITLE_LENGTH
                ]
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                msg: `description must has length between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH}.`,
                args: [
                    MIN_DESCRIPTION_LENGTH,
                    MAX_DESCRIPTION_LENGTH
                ]
            }
        }
    },
    content: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            isValidContent: function(value) {
                for (let currQuestion of value) {
                    const resultCheck = validate(currQuestion, testScheme);

                    if (resultCheck !== undefined) {
                        const firstErrorMsg = Object.values(resultCheck)[0][0];

                        throw new Error(firstErrorMsg);
                    }
                }
            },
            isValidAnswers: function (value) {
                for (let currQuestion of value) {
                    for (let currAnswer of currQuestion.answers) {
                        const resultCheck = validate(currAnswer, answerScheme);

                        if (resultCheck !== undefined) {
                            const firstErrorMsg = Object.values(resultCheck)[0][0];

                            throw new Error(firstErrorMsg);
                        }
                    }
                }
            }
        }
    }
});

export default Test;