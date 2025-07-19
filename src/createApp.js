import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/usersRouter.js";
import { sequelize } from "./db/database.js";
import { HttpError, ServerError } from "./errors/httpError.js";


export async function createApp({ cleanDatabase = false } = {}) {
    const app = express();

    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: cleanDatabase });
        console.log("Database connection successful");

        process.on('exit', function () {
            sequelize.close();
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

    app.use(morgan("tiny"));
    app.use(cors());
    app.use(express.json());
    app.use('/avatars', express.static('uploads'));


    const router = express.Router();
    router.use("/contacts", contactsRouter);
    router.use("/auth", authRouter);

    app.use("/api", router);
    app.use((_, res) => {
        res.status(404).json({ message: "Route not found" });
    });

    app.use((err, req, res, next) => {
        if (!(err instanceof HttpError)) {
            err = new ServerError(err.message);
        }
        res.status(err.statusCode).json(err);
    });

    return app;
}


