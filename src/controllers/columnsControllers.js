import _ from "lodash";
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

  const sortedColumns = _.orderBy(
    allColumns,
    [(obj) => obj.createdAt],
    ["asc"]
  );

  res.json(sortedColumns);
});

export const addColumn = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { title, boardId } = req.body;

  if (!boardId) {
    throw HttpError(404, "No board for such column");
  }

  const columnTitle = await Column.findOne({ title, userId, boardId });

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
  const { title, boardId } = req.body;
  const { id: columnId } = req.params;
  const { id: userId } = req.user;

  if (!columnId) {
    throw HttpError(404, "columnId is missing");
  }

  const oldColumn = await Column.findById({ _id: columnId });

  if (!oldColumn) {
    throw HttpError(404, `Column with id: ${columnId} not found`);
  }

  const newColumn = await Column.findOneAndUpdate(
    { _id: columnId, boardId, userId },
    { title },
    { new: true }
  );

  res.json(newColumn);
});

export const deleteColumn = errorWrapper(async (req, res) => {
  const { id: columnId } = req.params;
  const { id: userId } = req.user;
  const { boardId } = req.body;

  await Task.deleteMany({ columnId });

  const deletedColumn = await Column.findOneAndDelete({
    _id: columnId,
    boardId,
    userId,
  });

  if (!deletedColumn) {
    throw HttpError(
      404,
      `Column with id: ${columnId} not found and not removed`
    );
  }

  res.json(deletedColumn);
});
