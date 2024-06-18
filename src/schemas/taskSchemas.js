import Joi from "joi";

export const taskCreateSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: boardId" }),
  columnId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: columnId" }),
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
  label: Joi.string()
    .required()
    .trim()
    .lowercase()
    .valid("without priority", "low", "medium", "high")
    .messages({ "any.required": "Missing required field: label" }),
  deadline: Joi.string()
    .required()
    .trim()
    .messages({ "any.required": "Missing required field: deadline" }),
});

export const taskUpdateSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: boardId" }),
  columnId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: columnId" }),
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
  label: Joi.string()
    .required()
    .trim()
    .lowercase()
    .valid("without priority", "low", "medium", "high")
    .messages({ "any.required": "Missing required field: label" }),
  deadline: Joi.string()
    .required()
    .trim()
    .messages({ "any.required": "Missing required field: deadline" }),
});

export const taskUpdateTitleSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: boardId" }),
  title: Joi.string()
    .required()
    .max(50)
    .trim()
    .messages({ "any.required": "Missing required field: title" }),
});