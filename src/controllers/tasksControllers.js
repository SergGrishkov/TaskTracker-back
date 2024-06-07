import { errorWrapper } from "../helpers/Wrapper.js";
import Task from "../models/Task.js";
import HttpError from "../helpers/HttpError.js";
import _ from "lodash";

export const getAllTasks = errorWrapper(async (req, resp) => {
  const { id: userId } = req.user;
  const result = await Task.find({
    userId,
  });

  const sortedArray = _.orderBy(
    result,
    [(obj) => obj.createdAt],
    ["asc"]
  );

  resp.status(201).json(sortedArray);
});

export const createTask = errorWrapper(async (req, resp) => {
  const { id } = req.user;
  const { boardId, columnId } = req.body;
  if (!boardId || !columnId) {
    throw HttpError(404, "boadrId or columnId is missing");
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
  console.log("Task updated");
  const { id } = req.params;
  const { columnId } = req.body;

  if (!columnId) {
    throw HttpError(404, "columnId is missing");
  }

  const existingTask = await Task.findById(id);
  if (!existingTask) {
    throw HttpError(404, `Task with id: ${id} not found`);
  }

  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });

  resp.status(200).json(result);
});

export const deleteTask = errorWrapper(async (req, resp) => {
  const { id } = req.params;

  const removedTask = await Task.findByIdAndDelete(id);
  if (!removedTask) {
    throw HttpError(404, `Task with id: ${id} not found and not removed`);
  }

  resp.status(200).json(removedTask);
});
