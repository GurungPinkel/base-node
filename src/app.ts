import express from "express";
import cookieSession from "cookie-session";
import bodyParser, { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import "./config/env";
import { ErrorHandler, NotFoundError } from "@pinkelgrg/app-common";
import { stream } from "./config/winston";

import { TestRouter } from "./routes";

const app = express();

app.use(helmet());
app.set("trust proxy", true);
app.use(compression());

app.use(
    morgan(
        ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time[digits]ms :req[Content-Type]',
        { stream }
    )
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
);

app.use(TestRouter);

app.all("*", () => {
    throw new NotFoundError("404: Not Found");
});

app.use(ErrorHandler);

export default app;
