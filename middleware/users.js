import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { comparePassword } from "../auth.js";

export const checkForUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: "Wrong user ID",
      data: null,
    });
  }
  req.user = user;
  next();
};

export const checkUserPassword = async (res, req, next) => {
  const user = await User.findOne({ email: req.body.email });
  const valid = await comparePassword(req.body.password, user.password);
  if (!valid) {
    return res.status(400).send({
      message: "Wrong email or password",
      data: null,
    });
  }
  req.user = user;
  next();
};

export const auth = async (req, res, next) => {
  const { token } = req.header;
  if (!token) {
    return res.status(400).send({
      message: "Access denied,no token provided",
      data: null,
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(403).send({
      message: "Access denied to resources",
      data: null,
    });
  }
  next();
  return;
};
