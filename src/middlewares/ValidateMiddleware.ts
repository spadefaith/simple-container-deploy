const Joi = require("joi");

const validate = async (schema, data) => {
  const value = await schema.validateAsync(data);

  return value;
};
const ValidateMiddleware = {
  body: (schema) => {
    return async (req, res, next) => {
      try {
        const valid = await validate(schema, req.body);
        req.body = valid;
        next();
      } catch (err) {
        next(err);
      }
    };
  },
  query: (schema) => {
    return async (req, res, next) => {
      try {
        const valid = await validate(schema, req.query);
        req.query = valid;
        next();
      } catch (err) {
        next(err);
      }
    };
  },
  params: (schema) => {
    return async (req, res, next) => {
      try {
        const valid = await validate(schema, req.params);
        req.params = valid;
        next();
      } catch (err) {
        next(err);
      }
    };
  },
};

export default ValidateMiddleware;
