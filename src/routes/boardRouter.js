import express from "express";

import {
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardsControllers.js";

import validateId from "../helpers/validateId.js";
import validateBody from "../helpers/validateBody.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardSchemas.js";

const router = express.Router();

// const jsonParser = express.json();

router.get("/", getAllBoards);
router.post("/", validateBody(createBoardSchema), createBoard);
router.put(
  "/:boardId",
  validateId,
  validateBody(updateBoardSchema),
  updateBoard
);
router.delete("/:boardId", validateId, deleteBoard);

export default router;
