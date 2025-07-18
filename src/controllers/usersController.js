import { UniqueConstraintError } from "sequelize";
import * as userService from "../services/usersService.js";


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
            res.status(409).json({
                "message": "Email in use"
            });
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
        return res.status(401).json({
            "message": "Email or password is wrong"
        });
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