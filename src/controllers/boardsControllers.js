import Board from "../models/Board.js";
import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrapper.js";

export const getAllBoards = errorWrapper(async (req, res) => {
  const boards = await Board.find({ userId: req.user.id });
  res.status(200).json(boards);
});

export const createBoard = errorWrapper(async (req, res) => {
  const { title, icon, background } = req.body;
  const board = { title, icon, background, userId: req.user.id };

  const newBoard = await Board.create(board);
  res.status(201).send(newBoard);
});

export const updateBoard = errorWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, icon, background } = req.body;
  const board = { title, icon, background };

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const existingBoard = await Board.findById(id);
  if (!existingBoard) {
    throw HttpError(404, "Not found");
  }

  if (existingBoard.userId.toString() !== req.user.id.toString()) {
    throw HttpError(403, "Authentication problem, choose your board ");
  }
  const updatedBoard = await Board.findByIdAndUpdate(id, board, {
    new: true,
  });
  if (updatedBoard === null) {
    throw HttpError(404, "Not found");
  }

  res.send(updatedBoard);
});
export const deleteBoard = errorWrapper(async (req, res) => {
  const { id } = req.params;
  const existingBoard = await Board.findById(id);
  if (!existingBoard) {
    throw HttpError(404, "Not found");
  }

  if (existingBoard.userId.toString() !== req.user.id.toString()) {
    throw HttpError(403, "Authentication problem, choose your board");
  }
  const deletedBoard = await Board.findByIdAndDelete(id);
  if (deletedBoard === null) {
    throw HttpError(404, "Not found");
  }

  res.send(deletedBoard);
});
