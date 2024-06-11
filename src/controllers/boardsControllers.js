import Board from "../models/Board.js";
import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrapper.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import _ from "lodash";
import Background from "../models/Background.js";

export const getAllBoards = errorWrapper(async (req, res) => {
  const boards = await Board.find({ userId: req.user.id });

  const sortedBoards = _.orderBy(boards, [(obj) => obj.createdAt], ["asc"]);

  res.status(201).json(sortedBoards);
});

export const getOneBoard = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { id: boardId } = req.params;

  const tasks = await Task.find({ userId, boardId });
  if (!tasks) {
    throw HttpError(404, `Tasks not found.`);
  }

  const columns = await Column.find({ userId, boardId });
  if (!columns) {
    throw HttpError(404, `Columns not found.`);
  }

  const board = await Board.find({ _id: boardId, userId });
  if (!board) {
    throw HttpError(404, `Board not found.`);
  }

  const col = columns.map((c) => {
    console.log(c._id);
    return {
      ...c._doc,
      tasks: tasks.filter((t) => {
        return t.columnId.toString() === c._id.toString();
      }),
    };
  });
  const boarlFull = board[0]._doc;
  boarlFull.columns = col;

  res.status(200).json(boarlFull);
});

export const createBoard = errorWrapper(async (req, res) => {
  const { title, icon, enterImg } = req.body;
  const board = { title, icon, userId: req.user.id };
  const images = await Background.find();

  let background = null;
  for (const img of images) {
    if (img._doc[enterImg]) {
      background = img._doc[enterImg];
      break;
    }
  }
  const newBoard = await Board.create({ ...board, background });
  res.status(201).send(newBoard);
});

export const updateBoard = errorWrapper(async (req, res) => {
  const { id: boardId } = req.params;
  const { title, icon, background } = req.body;
  const board = { title, icon, background };

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const existingBoard = await Board.findById({ _id: boardId });
  if (!existingBoard) {
    throw HttpError(404, "Not found");
  }

  if (existingBoard.userId.toString() !== req.user.id.toString()) {
    throw HttpError(403, "Authentication problem, choose your board ");
  }
  const updatedBoard = await Board.findByIdAndUpdate(boardId, board, {
    new: true,
  });
  if (updatedBoard === null) {
    throw HttpError(404, "Not found");
  }

  res.send(updatedBoard);
});
export const deleteBoard = errorWrapper(async (req, res) => {
  const { id: boardId } = req.params;
  const existingBoard = await Board.findById(boardId);
  if (!existingBoard) {
    throw HttpError(404, "Not found");
  }
  await Task.deleteMany({ boardId });
  await Column.deleteMany({ boardId });
  if (existingBoard.userId.toString() !== req.user.id.toString()) {
    throw HttpError(403, "Authentication problem, choose your board");
  }
  const deletedBoard = await Board.findByIdAndDelete({ _id: boardId });
  if (deletedBoard === null) {
    throw HttpError(404, "Not found");
  }

  res.send(deletedBoard);
});

export const getAllBackgrounds = errorWrapper(async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) {
    throw HttpError(404);
  }

  const board = await Board.find({ userId });

  res.json(board);
});
