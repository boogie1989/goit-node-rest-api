import { UniqueConstraintError } from "sequelize";
import { ConflictError, UnauthorizedError } from "../errors/httpError.js";
import { UserService } from "../services/userService.js";
import { NotFoundError } from "../errors/httpError.js";


export class UserController {
    /**
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
     * @type {RequestHandler}
     */
    logout = async (req, res) => {
        await this.#userSercise.logout(req.user);
        res.status(204).end();
    }

    /**
     * @type {RequestHandler}
     */
    current = async (req, res) => {
        res.status(200).json(UserService.prepareUserResponseBody(req.user));
    }

    /**
     * @type {RequestHandler}
     */
    updateAvatar = async (req, res) => {
        res.status(200).json({
            avatarURL: await this.#userSercise.updateAvatar(req.user.id, req.file)
        });
    }

    /**
     * @type {RequestHandler}
     */
    sendVerificationEmail = async (req, res) => {
        const { userNotExist, alreadyPassed } = await this.#userSercise.sendVerificationEmail(req.body.email);
        if (userNotExist) {
            throw new NotFoundError("User not found");
        }
        if (alreadyPassed) {
            throw new BadRequestError("Verification has already been passed");
        }
        res.status(200).json({ message: "Verification email sent" });
    }

    /**
     * @type {RequestHandler}
     */
    verifyEmail = async (req, res) => {
        const token = req.params.verificationToken;
        const verified = await this.#userSercise.verifyEmail(token);
        if (!verified) {
            throw new NotFoundError("User not found");
        }

        res.status(200).json({ message: "Verification successful" });
    }
}

