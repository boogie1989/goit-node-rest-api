import HttpError from './HttpError.js';

export const handlerErrorCatcher = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next)
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};