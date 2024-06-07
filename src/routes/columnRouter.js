import express from "express";

import validateBody from "../helpers/validateBody.js";
import {
  addColumn,
  deleteColumn,
  getAllColumns,
  updateColumn,
} from "../controllers/columnsControllers.js";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchemas.js";
import isValidId from "../helpers/validateId.js";

const columnsRouter = express.Router();

columnsRouter.get("/", getAllColumns);
columnsRouter.post("/", validateBody(createColumnSchema), addColumn);
columnsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateColumnSchema),
  updateColumn
);
columnsRouter.delete("/:id", isValidId, deleteColumn);

export default columnsRouter;

