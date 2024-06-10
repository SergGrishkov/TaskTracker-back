import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/authSchemas.js";
import {
  register,
  login,
  logout,
  current,
  feedback,
} from "../controllers/authControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { feedbackSchema } from "../schemas/feedbackSchemas.js";
import { changeTheme, updateUser } from "../controllers/usersController.js";
import { changeThemeSchema, updateUserSchema } from "../schemas/userSchemas.js";
import isValidId from "../helpers/validateId.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.post("/login", validateBody(loginUserSchema), login);
authRouter.post("/logout", checkAuth, logout);

authRouter.patch(
  "/theme",
  checkAuth,
  validateBody(changeThemeSchema),
  changeTheme
);

authRouter.put(
  "/change/:id",
  isValidId,
  validateBody(updateUserSchema),
  updateUser
);

authRouter.get("/current", checkAuth, current);
authRouter.post("/feedback", validateBody(feedbackSchema), checkAuth, feedback);

export default authRouter;
