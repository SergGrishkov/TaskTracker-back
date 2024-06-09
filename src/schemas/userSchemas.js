import Joi from "joi";

export const changeThemeSchema = Joi.object({
  theme: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: theme" }),
});
