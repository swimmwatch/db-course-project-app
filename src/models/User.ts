import { Sequelize, DataTypes } from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../../util/config";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sequelize = new Sequelize(process.env.DATABASE_URL as string, config.db.options);

const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    }
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
User.hashPassword = async (value: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);

    return hash;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
User.comparePasswords = async (password: string, passwordHash: string) => {
    return await bcrypt.compare(password, passwordHash);
};

export default User;