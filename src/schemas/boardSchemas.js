import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Enter the title" }),
});
export const updateBoardSchema = Joi.object({
  title: Joi.string().lowercase().trim(),
});
