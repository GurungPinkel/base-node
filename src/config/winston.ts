import path from "path";
import winston, { createLogger, format } from "winston";
import split from "split";
import "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const myFormat = printf((data) => {
    return `[${data.level}]: ${data.timestamp}: ${data.message}`;
});

const transport = {
    app: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/app-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "debug"
    }),
    error: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/error-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "error"
    }),
    console: new winston.transports.Console({ level: "debug" })
};

const logger = createLogger({
    format: combine(
        format((info) => {
            return {
                ...info,
                level: info.level.toUpperCase()
            };
        })(),
        timestamp(),
        myFormat
    ),
    transports: [transport.app, transport.console, transport.error]
});

const stream = split().on("data", (line) => {
    logger.debug(line);
});

export { logger, stream };
