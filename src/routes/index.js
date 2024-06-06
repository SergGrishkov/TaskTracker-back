import express from "express";
import authRouter from "./authRouter.js";
import boardRouter from "./boardRouter.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();
router.use("/boards", checkAuth, boardRouter);
router.use("/users", authRouter);

export default router;
