import * as path from "path";
import express from "express";
import exphbs from "express-handlebars";
import compression from "compression";
import morgan from "morgan";
import serveFavicon from "serve-favicon";
import { Sequelize } from "sequelize";

import config from "./config";

import mainRouter from "./routes/main";
import authRouter from "./routes/auth";
import attemptRouter from "./routes/attempt";
import testEditorRouter from "./routes/testEditor";
import profileModify from "./routes/profileModify";
import errorHandler from "./middlewares/errorHandler";

import models from "./models";

const app = express();

// set static path
app.use("/static", express.static("src/public"));

// set template engine
app.set('views', path.join(process.cwd(), '/src', '/templates'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set response compression
app.use(compression());
// set logger
app.use(morgan("common"));
// serve json requests
app.use(express.json());
// serve form requests
app.use(express.urlencoded({ extended: true }));
// serve favicon
app.use(serveFavicon(path.join(process.cwd(), '/src', '/public', 'favicon.ico')))

const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.options);

// app.get("/admin", (req, res) => {
//     res.render("admin");
// });

app.use("/api", authRouter);
app.use("/api/profile", profileModify);
app.use("/api/attempt", attemptRouter);
app.use("/api/test", testEditorRouter);

app.use("*", mainRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        for (let model of models) {
            await model.sync();
        }

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Server started on port: ${PORT}.`);
});