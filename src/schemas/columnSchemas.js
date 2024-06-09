import Joi from "joi";

export const createColumnSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: boardId" }),
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Missing required field: title" }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({ "any.required": "Missing required field: title" }),
  boardId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: boardId" }),
});
