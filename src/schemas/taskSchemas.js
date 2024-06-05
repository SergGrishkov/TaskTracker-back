import Joi from "joi";

export const task = Joi.object({
  title: Joi.string()
    .required()
    .max(50)
    .trim()
    .messages({ "any.required": "Missing required field: title" }),
  description: Joi.string()
    .required()
    .max(1000)
    .trim()
    .messages({ "any.required": "Missing required field: description" }),
  color: Joi.string()
    .default("1")
    .required()
    .messages({ "any.required": "Missing required field: color" }),
  deadline: Joi.string()
    .required()
    .trim()
    .messages({ "any.required": "Missing required field: deadline" }),
});