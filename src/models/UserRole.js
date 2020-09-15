import { Sequelize } from "sequelize";

import config from "../../util/config";

import User from "./User";
import Role from "./Role";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

// setup many to many
const UserRole = sequelize.define("user_role", {});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export default UserRole;
