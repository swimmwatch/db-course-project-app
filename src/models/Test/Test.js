import * as DataTypes from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";

import {
    MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH,
    MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH
} from "./constraints";

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
        // TODO: validation
    }
});

export default Test;