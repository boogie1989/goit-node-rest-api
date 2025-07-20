import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
}).options({ stripUnknown: true });


export const verifySchema = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .messages({
            'any.required': 'Missing required field email',
            'string.empty': 'Missing required field email',
            'string.email': 'Invalid email format',
        })
}).options({ stripUnknown: true });