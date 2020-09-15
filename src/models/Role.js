import { Sequelize } from "sequelize";

import config from "../config";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
    }
});

export default Role;