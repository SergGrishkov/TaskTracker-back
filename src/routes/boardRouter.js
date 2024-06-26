import express from "express";

import {
  getAllBoards,
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllBackgrounds,
} from "../controllers/boardsControllers.js";

import validateId from "../helpers/validateId.js";
import validateBody from "../helpers/validateBody.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardSchemas.js";

const router = express.Router();

router.get("/", getAllBoards);
router.get("/backgrounds", getAllBackgrounds);
router.get("/:id", validateId, getOneBoard);
router.post("/", validateBody(createBoardSchema), createBoard);
router.put("/:id", validateId, validateBody(updateBoardSchema), updateBoard);
router.delete("/:id", validateId, deleteBoard);

export default router;
