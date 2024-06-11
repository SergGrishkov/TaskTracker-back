import { errorWrapper } from "../helpers/Wrapper.js";
import Task from "../models/Task.js";
import Column from "../models/Column.js";
import HttpError from "../helpers/HttpError.js";
import _ from "lodash";

export const getAllTasks = errorWrapper(async (req, resp) => {
  const { id: userId } = req.user;
  const result = await Task.find({
    userId,
  });

  const sortedArray = _.orderBy(result, [(obj) => obj.createdAt], ["asc"]);

  resp.status(201).json(sortedArray);
});

export const createTask = errorWrapper(async (req, resp) => {
  const { id } = req.user;
  const { boardId, columnId } = req.body;
  if (!boardId || !columnId) {
    throw HttpError(404, "boardId or columnId is missing");
  }

  const result = await Task.create({
    userId: id,
    boardId,
    columnId,
    ...req.body,
  });

  resp.status(201).json(result);
});

export const updateTask = errorWrapper(async (req, resp) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { columnId, boardId } = req.body;

  if (!columnId) {
    throw HttpError(404, "columnId is missing");
  }

  const result = await Task.findOneAndUpdate(
    { _id: id, userId, boardId, columnId },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Task with id: ${id} not found`);
  }

  resp.status(200).json(result);
});

export const deleteTask = errorWrapper(async (req, resp) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { columnId } = req.body;

  const removedTask = await Task.findOneAndDelete({
    _id: id,
    userId,
    columnId,
  });
  if (!removedTask) {
    throw HttpError(404, `Task with id: ${id} not found and not removed`);
  }

  resp.status(200).json(removedTask);
});

export const updateTaskColumnIdByTaskId = errorWrapper(async (req, resp) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  const { title, boardId, columnId } = req.body;

  const column = await Column.findOne({ title, userId, boardId, columnId });
  if (!column) {
    throw HttpError(404, `Column with title: '${title}' not found`);
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId, boardId, columnId },
    { columnId: column._id },
    {
      new: true,
    }
  );
  if (!task) {
    throw HttpError(404, `Task with id: ${id} not found and can't update.`);
  }

  resp.status(200).json(task);
});
