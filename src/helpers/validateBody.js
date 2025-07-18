import { BadRequestError } from "../errors/httpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new BadRequestError(error.message));
    }
    req.body = value;
    next();
  };

  return func;
};

export default validateBody;
