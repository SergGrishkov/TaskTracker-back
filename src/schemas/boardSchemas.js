import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Enter the title" }),
  icon: Joi.string(),
  background: Joi.string(),
});
export const updateBoardSchema = Joi.object({
  title: Joi.string().lowercase().trim(),
  icon: Joi.string().valid("Light", "Dark", "Violet"),
  background: Joi.string().valid("Light", "Dark", "Violet"),
});
