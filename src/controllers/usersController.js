import { UniqueConstraintError } from "sequelize";
import { ConflictError, UnauthorizedError } from "../errors/httpError.js";
import { UserService } from "../services/userService.js";

export class UserController {
    /**
     * Handles all the controllers for contacts.
     * @type {UserService}
     */
    #userSercise;

    /**
     * 
     * @param {UserService} userService 
     */
    constructor(userService) {
        this.#userSercise = userService;
    }

    /**
     * Handles all the controllers for contacts.
     * @type {RequestHandler}
     */
    register = async (req, res) => {
        try {
            const user = await this.#userSercise.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new ConflictError("Email in use");
            }
            throw error;
        }
    }

    /**
     * Handles all the controllers for contacts.
     * @type {RequestHandler}
     */
    login = async (req, res) => {
        const user = await this.#userSercise.login(req.body);
        if (!user) {
            throw new UnauthorizedError("Email or password is wrong");
        }
        res.status(200).json(user);
    }

    /**
     * Handles all the controllers for contacts.
     * @type {RequestHandler}
     */
    logout = async (req, res) => {
        await this.#userSercise.logout(req.user);
        res.status(204).end();
    }

    /**
     * Handles all the controllers for contacts.
     * @type {RequestHandler}
     */
    current = async (req, res) => {
        res.status(200).json(UserService.prepareUserResponseBody(req.user));
    }

    /**
     * Handles all the controllers for contacts.
     * @type {RequestHandler}
     */
    updateAvatar = async (req, res) => {
        res.status(200).json({
            avatarURL: await this.#userSercise.updateAvatar(req.user.id, req.file)
        });
    }
}

