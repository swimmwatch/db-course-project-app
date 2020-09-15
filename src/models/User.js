import { Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../config";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: Sequelize.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
    }, {
        classMethods: {
            async hashPassword(value) {
                const salt = await bcrypt.genSalt(10);

                return await bcrypt.hash(value, salt);
            }
        }, instanceMethods: {
            async comparePasswords(password, passwordHash) {
                return await bcrypt.compare(password, passwordHash);
            }
        }
    }
);

export default User;