import { User } from "../db/models/user.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { createToken } from "../helpers/token.js";
import { generateAvatar } from "../helpers/avatars.js";

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
     * Reads the contacts from the file and returns them as an array of objects.
     * 
     * @returns {Promise<User>} Array of contact objects.
     */
    async register(body) {
        const user = await User.create({
            ...body,
            password: await hashPassword(body.password),
            avatarURL: generateAvatar(body.email),
        });
        return UserService.prepareUserResponseBody(user);
    }

    /**
     * 
     * @returns {Promise<User | null>} Contact object or null if not found.
     */
    async login(body) {
        const user = await User.findOne({ where: { email: body.email } });
        if (user && await comparePassword(body.password, user.password)) {
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

}
