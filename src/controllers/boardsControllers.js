import Board from "../models/Board";
import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrappre.js";
import boardSchema from "../schemas/boardSchemas.js";

export const createBoard = errorWrapper(async (req, res) => {
  const { title, icon, background } = req.body;
  const board = { title, icon, background, owner: req.user.id };

  const { error } = createBoardSchema.validate(req.body);
  if (typeof error !== "undefined") {
    throw HttpError(400, error.message);
  }
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
  const { error } = createBoardSchema.validate(req.body);
  if (typeof error !== "undefined") {
    throw HttpError(400, error.message);
  }
  const existingBoard = await Board.findById(id);
  if (!existingBoard) {
    throw HttpError(404, "Not found");
  }

  if (existingBoard.owner.toString() !== req.user.id) {
    throw HttpError(403, "Not your Board, ALARMA");
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

  if (existingBoard.owner.toString() !== req.user.id) {
    throw HttpError(403, "Not your Board, ALARMA");
  }
  const deletedBoard = await Contact.findByIdAndDelete(id);
  if (deletedBoard === null) {
    throw HttpError(404, "Not found");
  }

  res.send(deletedBoard);
});
