import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(6),
  email: Joi.string().email(),
});

export const changeThemeSchema = Joi.object({
  theme: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: theme" })
    .valid("Light", "Dark", "Violet"),
});
