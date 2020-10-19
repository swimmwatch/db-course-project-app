import * as DataTypes from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";
import User from "../User";
import Test from "../Test";

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

const Attempt = sequelize.define("attempt", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
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
        // TODO: make validation
    }
});

User.hasMany(Attempt, { onDelete: 'cascade' });
Test.belongsTo(Attempt, { onDelete: 'cascade' });
Attempt.belongsTo(User);
Attempt.belongsTo(Test);

export default Attempt;