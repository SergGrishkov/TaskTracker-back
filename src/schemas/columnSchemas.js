import Joi from "joi";

export const createAndUpdateColumnSchema = Joi.object({
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Missing required field: title" }),
});
