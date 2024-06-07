import { errorWrapper } from "../helpers/Wrapper.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import HttpError from "../helpers/HttpError.js";

export const getAllColumns = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;

  const allColumns = await Column.find({ userId });

  if (!allColumns) {
    throw HttpError(401);
  }

  res.json(allColumns);
});

export const addColumn = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { title, boardId } = req.body;

  if (!boardId) {
    throw HttpError(404, "No board for such column");
  }

  const columnTitle = await Column.findOne({ title });

  if (columnTitle) {
    throw HttpError(409, "Try another title. This one is already used");
  }

  const newColumn = await Column.create({
    userId,
    boardId,
    title,
    ...req.body,
  });

  res.status(201).json(newColumn);
});

export const updateColumn = errorWrapper(async (req, res) => {
  const { title } = req.body;
  const { id: columnId } = req.params;

  if (!columnId) {
    throw HttpError(404, "columnId is missing");
  }

  const oldColumn = await Column.findById({ columnId });

  if (!oldColumn) {
    throw HttpError(404);
  }

  const newColumn = await Column.findByIdAndUpdate(
    columnId,
    { title },
    { new: true }
  );

  res.json(newColumn);
});

export const deleteColumn = errorWrapper(async (req, res) => {
  const { id: columnId } = req.params;

  const deletedColumn = await Column.findByIdAndDelete(columnId);

  await Task.deleteMany({ columnId });

  if (!deletedColumn) {
    throw HttpError(404);
  }

  res.json(deletedColumn);
});
