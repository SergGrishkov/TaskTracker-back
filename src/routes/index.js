import express from "express";
import authRouter from "./authRouter.js";
import taskRouter from "./taskRouter.js";
import boardRouter from "./boardRouter.js";
import columnsRouter from "./columnRouter.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();
router.use("/boards", checkAuth, boardRouter);
router.use("/columns", checkAuth, columnsRouter);
router.use("/users", authRouter);
router.use("/tasks", checkAuth, taskRouter);

export default router;
