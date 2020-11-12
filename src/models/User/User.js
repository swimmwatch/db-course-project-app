import { Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../../config";
import { userConstraints } from "./constraints";
import Test from "../Test";

const {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MAX_LOGIN_LENGTH,
    MAX_EMAIL_LENGTH
} = userConstraints;

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: Sequelize.STRING(MAX_LOGIN_LENGTH),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    msg: `login must has length between ${MIN_LOGIN_LENGTH} and ${MAX_LOGIN_LENGTH}.`,
                    args: [
                        MIN_LOGIN_LENGTH,
                        MAX_LOGIN_LENGTH
                    ]
                }
            }
        },
        password: {
            type: Sequelize.STRING(MAX_PASSWORD_LENGTH),
            allowNull: false,
            validate: {
                len: {
                    msg: `password must has length between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH}.`,
                    args: [
                        MIN_PASSWORD_LENGTH,
                        MAX_PASSWORD_LENGTH
                    ]
                }
            }
        },
        email: {
            type: Sequelize.STRING(MAX_EMAIL_LENGTH),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'invalid email address.'
                }
            }
        },
    }
);

// model methods
User.hashPassword = async (value) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(value, salt);
};

User.prototype.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.initState = function() {
    const { login } = this;

    return {
        user: { login }
    }
};

// hooks
User.beforeCreate(async user => {
    user.password = await User.hashPassword(user.password);
});

User.beforeUpdate(async user => {
    user.password = await User.hashPassword(user.password);
});

User.hasMany(Test, { onDelete: 'cascade' });
Test.belongsTo(User);

export default User;