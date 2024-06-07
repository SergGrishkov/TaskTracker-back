import express from "express";

import validateBody from "../helpers/validateBody.js";
import {
  addColumn,
  deleteColumn,
  getAllColumns,
  updateColumn,
} from "../controllers/columnsControllers.js";
import { createAndUpdateColumnSchema } from "../schemas/columnSchemas.js";
import isValidId from "../helpers/validateId.js";

const columnsRouter = express.Router();

columnsRouter.get("/", getAllColumns);
columnsRouter.post("/", validateBody(createAndUpdateColumnSchema), addColumn);
columnsRouter.put(
  "/:id",
  isValidId,
  validateBody(createAndUpdateColumnSchema),
  updateColumn
);
columnsRouter.delete("/:id", isValidId, deleteColumn);

export default columnsRouter;
