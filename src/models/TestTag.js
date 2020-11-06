import { Sequelize } from "sequelize";

import config from "../config";

import Test from "./Test";
import Tag from "./Tag";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

// setup many to many
const TestTag = sequelize.define("test_tag", {}, {
    timestamps: false
});

Test.belongsToMany(Tag, { through: TestTag });
Tag.belongsToMany(Test, { through: TestTag });

Test.hasMany(TestTag);
TestTag.belongsTo(Test);
Tag.hasMany(TestTag);
TestTag.belongsTo(Tag);

export default TestTag;
