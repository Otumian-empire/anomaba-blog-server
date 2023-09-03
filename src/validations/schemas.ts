import Joi from "joi";

export const BasicAuth = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});
