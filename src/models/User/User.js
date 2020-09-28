import {
    Sequelize,
    ValidationError,
    ValidationErrorItem
} from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../../config";
import userConstraints from "./constraints";

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
                    msg: `Invalid login. It must has length between ${MIN_LOGIN_LENGTH} and ${MAX_LOGIN_LENGTH}.`,
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
                    msg: `Invalid password. It must has length between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH}.`,
                    args: [
                        MIN_PASSWORD_LENGTH,
                        MAX_PASSWORD_LENGTH
                    ]
                }
            }
        },
        email: {
            type: Sequelize.STRING(MAX_EMAIL_LENGTH),
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Invalid email address.'
                }
            }
        },
    }
);

User.hashPassword = async (value) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(value, salt);
};

User.prototype.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.beforeCreate(async (user, options) => {
    const { repeatPassword } = options;

    if (repeatPassword !== user.password) {
        const err = new ValidationError();
        const errItem = new ValidationErrorItem("Passwords doesn't equal.")

        err.errors.push(errItem);

        throw err;
    }

    user.password = await User.hashPassword(user.password);
});

export default User;