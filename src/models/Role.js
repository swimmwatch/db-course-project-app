import { Sequelize, DataTypes } from "sequelize";

import config from "../../util/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Role = sequelize.define("role", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: new DataTypes.STRING(64),
        allowNull: false,
        unique: true
    }
});

export default Role;