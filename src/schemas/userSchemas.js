import Joi from "joi";

export const changeThemeSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: userId" })
    .trim(),
  theme: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: theme" }),
});
