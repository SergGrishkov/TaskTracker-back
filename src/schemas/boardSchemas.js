import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Enter the title" }),
  icon: Joi.string(),
  background: Joi.string(),
  enterImg: Joi.string(),
});
export const updateBoardSchema = Joi.object({
  title: Joi.string().lowercase().trim(),
  icon: Joi.string(),
  background: Joi.string().allow('').optional(),
  enterImg: Joi.string(),
});
