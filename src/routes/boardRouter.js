import express from "express";

import {
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardsControllers.js";

import validateId from "../helpers/validateId.js";

const router = express.Router();

const jsonParser = express.json();

router.get("/", getAllBoards);
router.post("/", jsonParser, createBoard);
router.put("/:id", validateId, jsonParser, updateBoard);
router.delete("/:id", validateId, deleteBoard);

export default router;
