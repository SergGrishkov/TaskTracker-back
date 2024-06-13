import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().lowercase().trim(),
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({ "any.required": "Missing required field: email" }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9!@#$%^&*(),.?:{}|<>]+$"))
    .required()
    .min(8)
    .max(64)
    .messages({ "any.required": "Missing required field: password" }),
  theme: Joi.string().trim().valid("Light", "Dark", "Violet"),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({ "any.required": "Missing required field: email" }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9!@#$%^&*(),.?:{}|<>]+$"))
    .required()
    .min(8)
    .max(64)
    .messages({ "any.required": "Missing required field: password" }),
});

export const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
});
