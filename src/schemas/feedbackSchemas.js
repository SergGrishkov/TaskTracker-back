import Joi from "joi";

export const feedbackSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .max(250)
    .messages({ "any.required": "Missing required field: email" }),
  message: Joi.string(),
});
