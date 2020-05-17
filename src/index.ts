import Debug from "debug";
import app from "./app";

const debug = Debug("AppName");
const port = process.env.APP_PORT;

app.listen(port, () => {
    debug(`Auth is listening on port ${port}!!`);
});
