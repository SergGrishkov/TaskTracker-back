import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  taskCreateSchema,
  taskUpdateSchema,
  taskUpdateTitleSchema,
} from "../schemas/taskSchemas.js";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskColumnIdByTaskId,
} from "../controllers/tasksControllers.js";
import validateId from "../helpers/validateId.js";

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", validateBody(taskCreateSchema), createTask);
taskRouter.put("/:id", validateId, validateBody(taskUpdateSchema), updateTask);
taskRouter.patch(
  "/:id",
  validateId,
  validateBody(taskUpdateTitleSchema),
  updateTaskColumnIdByTaskId
);
taskRouter.delete("/:id", validateId, deleteTask);

export default taskRouter;
