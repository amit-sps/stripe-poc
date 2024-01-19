const Joi = require("joi");

exports.registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.body);
  if (error !== undefined) {
    const responseData = {
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {},
    };
    return res.status(422).json(responseData);
  }
  req.validated = value;
  next();
};


exports.loginValidation = async (req, res, next) => {

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.body);
  if (error !== undefined) {
    const responseData = {
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {},
    };
    return res.status(422).json(responseData);
  }
  req.validated = value;
  next();
};