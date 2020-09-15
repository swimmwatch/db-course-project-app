import { Sequelize } from "sequelize";

import config from "../../util/config";

import User from "../models/User";
import Role from "../models/Role";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sequelize = new Sequelize(process.env.DATABASE_URL as string, config.db.options);

// setup many to many
const UserRole = sequelize.define("user_role", {});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export default UserRole;
