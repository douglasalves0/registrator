import { Express } from "express";
import { Logger } from "./logger/logger";
import { registerRouter } from "./router/register.route";
import rm from "reflect-metadata";
import env from "./config/env";
import express from "express";

const app: Express = express();
const PORT: number = env.APP_PORT;

app.use(express.json());
app.use('/register', registerRouter);

app.listen(PORT, () => {
    Logger.emphasis(`The app is running on port ${PORT}, have a good day!`);
});