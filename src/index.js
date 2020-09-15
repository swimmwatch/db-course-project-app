import * as express from "express";
import * as path from "path";
import * as exphbs from "express-handlebars";
import * as compression from "compression";
import * as morgan from "morgan";
import * as serveFavicon from "serve-favicon";
import { Sequelize } from "sequelize";

import config from "../util/config";

import authErrorHandler from "./middlewares/authErrorHandler";

import authRouter from "./routes/auth";
import checkToken from "./middlewares/checkToken";

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore.
const sequelize = new Sequelize(process.env.DATABASE_URL as string, config.db.options);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.get("/test_token", checkToken, (req, res) => {
    res.send("hello! you can read this secure resource.");
});

app.use("/api", authRouter);

app.use(authErrorHandler);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Server started on port: ${PORT}.`);
});