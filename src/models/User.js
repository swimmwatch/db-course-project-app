import { Sequelize, DataTypes } from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../../util/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: new DataTypes.STRING,
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

User.hashPassword = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);

    return hash;
};

User.comparePasswords = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
};

export default User;