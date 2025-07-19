import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { uploadAvatarMiddleware } from "../middlewares/avatarMiddleware.js";
import { UserController } from "../controllers/usersController.js";
import { UserService } from "../services/userService.js";

const userController = new UserController(
    new UserService()
);

export default express.Router()
    .post("/register", validateBody(registerSchema), errorHandler(userController.register))
    .post("/login", validateBody(registerSchema), errorHandler(userController.login))
    .post("/logout", authMiddleware, errorHandler(userController.logout))
    .get("/current", authMiddleware, errorHandler(userController.current))
    .patch("/avatars", authMiddleware, uploadAvatarMiddleware, errorHandler(userController.updateAvatar));