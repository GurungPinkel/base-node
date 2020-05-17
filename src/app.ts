import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import bodyParser, { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
import TestRouter from "./routes";

dotenv.config();
const app = express();

app.use(helmet());
app.set("trust proxy", true);
app.use(compression());

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
    console.error("not found 404");
});

export default app;
