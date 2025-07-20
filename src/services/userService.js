import { User } from "../db/models/user.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { createToken, createVerificationToken } from "../helpers/token.js";
import { generateAvatar } from "../helpers/avatars.js";
import { EmailService } from "./emailService.js";

export class UserService {
    static prepareUserResponseBody(user) {
        return {
            user: {
                email: user.email,
                subscription: user.subscription,
                avatarURL: user.avatarURL,
            }
        };
    }


    /**
     * @type {EmailService}
     */
    #emailService;

    /**
     * 
     * @param {EmailService} emailService 
     */
    constructor(emailService) {
        this.#emailService = emailService;
    }


    /**
     * Reads the contacts from the file and returns them as an array of objects.
     * 
     * @returns {Promise<User>} Array of contact objects.
     */
    async register(body) {
        const user = await User.create({
            ...body,
            password: await hashPassword(body.password),
            avatarURL: generateAvatar(body.email),
            verificationToken: await createVerificationToken(),
        });
        console.log(user.verificationToken);
        await this.#emailService.sendVerification(user.email, user.verificationToken);
        return UserService.prepareUserResponseBody(user);
    }

    /**
     * 
     * @returns {Promise<User | null>} Contact object or null if not found.
     */
    async login(body) {
        const user = await User.findOne({ where: { email: body.email } });
        if (user && user.verify && await comparePassword(body.password, user.password)) {
            const token = await createToken({ email: user.email });
            user.token = token;
            await user.save();
            return {
                token,
                ...UserService.prepareUserResponseBody(user),
            };
        }
        return null;
    }


    /**
     * 
     * @returns {Promise<null>} Contact object or null if not found.
     */
    async logout(user) {
        user.token = null;
        await user.save();
    }

    /**
     * 
     * @returns {Promise<string>} Contact object or null if not found.
     */
    async updateAvatar(userId, file) {
        const user = await User.findOne({ where: { id: userId } });
        user.avatarURL = file.filename;
        await user.save();
        return user.avatarURL;
    }


    /**
     * 
     * @param {string} email 
     * @returns {Promise<{ userNotExist: boolean, alreadyPassed: boolean }>} Contact object or null if not found.
     */
    async sendVerificationEmail(email) {
        const user = await User.findOne({ where: { email } });
        const response = { userNotExist: false, alreadyPassed: false };

        if (!user) {
            response.userNotExist = true;
            return response;
        }

        if (user.verify) {
            response.alreadyPassed = true;
            return response;
        }

        const verificationToken = await createVerificationToken();
        await user.update({ verificationToken });
        await this.#emailService.sendVerification(user.email, verificationToken);

        return { userNotExist: false, alreadyPassed: false };
    }

    /**
     * 
     * @param {string} token 
     * @returns {Promise<boolean>} Contact object or null if not found.
     */
    async verifyEmail(verificationToken) {
        const user = await User.findOne({ where: { verificationToken } });
        if (!user) {
            return false;
        }
        await user.update({
            verify: true,
            verificationToken: null,
        });
        return true;
    }
}
