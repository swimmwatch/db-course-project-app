import * as DataTypes from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";
import User from "../User";
import Test from "../Test";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Attempt = sequelize.define("attempt", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    result: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0.0,
            max: 1.0
        }
    },
    answers: {
        type: DataTypes.JSON,
    }
});

// create associations
User.hasMany(Attempt, { onDelete: 'cascade' });
Attempt.belongsTo(Test, { onDelete: 'cascade' });
Attempt.belongsTo(User, { onDelete: 'cascade' });

Test.afterUpdate(async test => {
    // handle case if test is updated

    await Attempt.destroy({
        where: {
            testId: test.id
        }
    });
});

export default Attempt;