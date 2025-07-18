import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
}).options({ stripUnknown: true });