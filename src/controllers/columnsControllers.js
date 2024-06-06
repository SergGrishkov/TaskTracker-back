import { nanoid } from "nanoid";
import { errorWrapper } from "../helpers/Wrapper.js";
import Column from "../models/Column.js";
import HttpError from "../helpers/HttpError.js";

export const addColumn = errorWrapper(async (req, res) => {
  const { title } = req.body;

  const id = nanoid();

  const columnTitle = await Column.findOne({ title });

  if (columnTitle) {
    throw HttpError(409, "Try another title. This one is already used");
  }

  const newColumn = await Column.create({ id, title });

  res.status(201).json(newColumn);
});

export const updateColumn = errorWrapper(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const newTitle = await Column.findByIdAndUpdate(id, { title }, { new: true });

  if (!newTitle) {
    throw HttpError(404);
  }

  res.json(newTitle);
});
