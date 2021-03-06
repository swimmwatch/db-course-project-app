import * as DataTypes from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";

import * as tagConstraints from "./constraints";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                msg: `tag must has length between ${tagConstraints.MIN_TAG_NAME_LENGTH} and ${tagConstraints.MAX_TAG_NAME_LENGTH}.`,
                args: [
                    tagConstraints.MIN_TAG_NAME_LENGTH,
                    tagConstraints.MAX_TAG_NAME_LENGTH
                ]
            }
        }
    }
}, {
    timestamps: false
});

export default Tag;
