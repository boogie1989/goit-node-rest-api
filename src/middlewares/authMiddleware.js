import { User } from "../db/models/user.js";
import { verifyToken } from "../helpers/token.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { email } = await verifyToken(token);
        const user = await User.findOne({ where: { email } });

        if (user?.token != token) {
            throw new Error("Not authorized");
        }
        req.user = user;
        next();
    } catch (_) {
        return res.status(401).json({
            "message": "Not authorized"
        });
    }
};