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
  icon: Joi.string().valid(
    "icon/project",
    "star",
    "loading",
    "container",
    "lightning",
    "colors",
    "hexagon"
  ),
  background: Joi.string().valid(
    "magnolia",
    "night",
    "sakura",
    "moon",
    "lists",
    "sky",
    "rocks",
    "drib",
    "moon2",
    "boat",
    "balloon",
    "rocks2",
    "sea",
    "balloons",
    "nightsky"
  ),
});
