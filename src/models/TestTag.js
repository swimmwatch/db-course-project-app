import { Sequelize } from "sequelize";

import config from "../config";

import Test from "./Test";
import Tag from "./Tag";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

// setup many to many
const TestTag = sequelize.define("test_tag", {}, {
    timestamps: false
});

Test.belongsToMany(Tag, { through: TestTag, hooks: true });
Tag.belongsToMany(Test, { through: TestTag, hooks: true });

Test.hasMany(TestTag);
TestTag.belongsTo(Test);
Tag.hasMany(TestTag);
TestTag.belongsTo(Tag);

Test.afterDestroy(async () => {
    const allTags = await Tag.findAll();

    // delete tags that not exist
    for (let tag of allTags) {
        const testTag = await TestTag.findAll({
            where: {
                tagId: tag.id
            }
        });

        if (!testTag.length) {
            await tag.destroy();
        }
    }
});

export default TestTag;
