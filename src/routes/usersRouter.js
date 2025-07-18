import express from "express";
import { registerHandler, loginHandler, logoutHandler, currentHandler } from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { handlerErrorCatcher } from "../helpers/handlerErrorCatcher.js";

export default express.Router()
    .post("/register", validateBody(registerSchema), handlerErrorCatcher(registerHandler))
    .post("/login", validateBody(registerSchema), handlerErrorCatcher(loginHandler))
    .post("/logout", authMiddleware, handlerErrorCatcher(logoutHandler))
    .get("/current", authMiddleware, handlerErrorCatcher(currentHandler));