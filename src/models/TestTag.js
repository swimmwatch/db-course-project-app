import { Sequelize } from "sequelize";

import config from "../config";

import Test from "./Test";
import Tag from "./Tag";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

// setup many to many
const TestTag = sequelize.define("test_tag", {});

Test.belongsToMany(Tag, { through: TestTag });
Tag.belongsToMany(Test, { through: TestTag });

export default TestTag;
