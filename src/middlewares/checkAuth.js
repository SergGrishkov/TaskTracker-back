import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).send({ message: "Invalid token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      }

      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Invalid token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.user = {
        id: user._id,
        email: user.email,
      };
      next();
    });
  } catch (error) {
    next(error);
  }
};
