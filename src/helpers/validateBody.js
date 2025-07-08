import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    req.body = value;
    next();
  };

  return func;
};

export default validateBody;
