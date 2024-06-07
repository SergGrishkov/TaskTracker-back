import HttpError from "../helpers/HttpError.js";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const { boardId } = req.params;
  if (!isValidObjectId(boardId)) {
    next(HttpError(404, "Not found"));
  }
  next();
};

export default isValidId;
