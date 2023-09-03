import Joi from "joi";

export const BasicAuth = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const WriteArticle = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required()
});
