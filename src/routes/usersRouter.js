import express from "express";
import { registerHandler, loginHandler, logoutHandler, currentHandler, updateAvatarHandler } from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { uploadAvatarMiddleware } from "../middlewares/avatarMiddleware.js";

export default express.Router()
    .post("/register", validateBody(registerSchema), errorHandler(registerHandler))
    .post("/login", validateBody(registerSchema), errorHandler(loginHandler))
    .post("/logout", authMiddleware, errorHandler(logoutHandler))
    .get("/current", authMiddleware, errorHandler(currentHandler))
    .patch("/avatars", authMiddleware, uploadAvatarMiddleware, errorHandler(updateAvatarHandler));