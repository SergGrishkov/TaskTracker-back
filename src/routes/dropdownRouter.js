import express from "express";
import { chooseColumn } from "../controllers/dropdownControllers.js";
import isValidId from "../helpers/validateId.js";

const dropdownRouter = express.Router();

dropdownRouter.patch("/:id", isValidId, chooseColumn);

export default dropdownRouter;
