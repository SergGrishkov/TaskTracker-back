import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

export const checkAuth = async (req, _, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw HttpError(401);
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        throw HttpError(401);
      }

      const user = await User.findById(decode.id);

      if (!user || user.token !== token) {
        throw HttpError(401);
      }

      req.user = {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      };
      next();
    });
  } catch (error) {
    next(error);
  }
};
