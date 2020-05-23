import express from "express";
import { logger } from "../config/winston";

const router = express.Router();

const TestRouter = router.get("/api/test", async (req, res, next) => {
    const { name } = req.body;
    // return next("");
    logger.error("Testing error logger");
    logger.info("Testing info logger");
    logger.debug("Testing debug logger");

    if (!name) {
        return next("No name provided");
    }

    return res.send({ name });
});

export { TestRouter };
