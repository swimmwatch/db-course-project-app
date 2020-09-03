import { Sequelize, Model, DataTypes } from "sequelize";
import * as bcrypt from "bcrypt";

import config from "../../util/config";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sequelize = new Sequelize(process.env.DATABASE_URL as string, config.db.options);

class User extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public email!: string;
}

User.init(
    {
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
            async set(value) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(value, salt);

                this.setDataValue("password", hash);
            }
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize,
    }
);

export default User;