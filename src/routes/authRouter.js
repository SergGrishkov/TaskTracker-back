import express from 'express';
import validateBody from "../helpers/validateBody.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../schemas/authSchemas.js";
import {
  register,
  login,
  logout,
} from "../controllers/authControllers.js";
import {checkAuth} from '../middlewares/checkAuth.js';

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.post("/login", validateBody(loginUserSchema), login);
authRouter.post("/logout", checkAuth, logout);

export default authRouter;