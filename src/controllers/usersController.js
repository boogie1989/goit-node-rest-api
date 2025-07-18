import { UniqueConstraintError } from "sequelize";
import * as userService from "../services/usersService.js";
import { BadRequestError, ConflictError, UnauthorizedError } from "../errors/httpError.js";


/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const registerHandler = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new ConflictError("Email in use");
        }
        throw error;
    }
};


/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const loginHandler = async (req, res) => {
    const user = await userService.login(req.body);
    if (!user) {
        throw new UnauthorizedError("Email or password is wrong");
    }
    res.status(200).json(user);
};


/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const logoutHandler = async (req, res) => {
    await userService.logout(req.user);
    res.status(204).end();
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const currentHandler = async (req, res) => {
    res.status(200).json(userService.prepareUserResponseBody(req.user));
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const updateAvatarHandler = async (req, res) => {
    res.status(200).json({
        avatarURL: await userService.updateAvatar(req.user.id, req.file)
    });
};
