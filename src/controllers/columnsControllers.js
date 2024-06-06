import { errorWrapper } from "../helpers/Wrapper.js";
import Column from "../models/Column.js";
import HttpError from "../helpers/HttpError.js";

export const getAllColumns = errorWrapper(async (req, res) => {
  const { userId } = req.user;

  const allColumns = await Column.find({ userId });

  if (!allColumns) {
    throw HttpError(401);
  }

  res.json(allColumns);
});

export const addColumn = errorWrapper(async (req, res) => {
  const { title } = req.body;

  const columnTitle = await Column.findOne({ title });

  if (columnTitle) {
    throw HttpError(409, "Try another title. This one is already used");
  }

  const newColumn = await Column.create({ title });

  res.status(201).json(newColumn);
});

export const updateColumn = errorWrapper(async (req, res) => {
  const { title } = req.body;
  const { columnId } = req.params;

  const newTitle = await Column.findByIdAndUpdate(
    columnId,
    { title },
    { new: true }
  );

  if (!newTitle) {
    throw HttpError(404);
  }

  res.json(newTitle);
});

export const deleteColumn = errorWrapper(async (req, res) => {
  const { columnId } = req.params;

  const deletedColumn = await Column.findByIdAndDelete(columnId);

  if (!deletedColumn) {
    throw HttpError(404);
  }

  res.json(deletedColumn);
});
