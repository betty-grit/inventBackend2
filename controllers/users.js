import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";
import { generatePassword, comparePassword } from "../auth.js";
import { responseHandler } from "../responses.js";

//POST REQUESTS
//CREATE USER
export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, shopName, password } = req.body;
    const { salt, hash } = await generatePassword(password);
    const user = await User.create({
      fullName: fullName,
      email,
      shopName,
      password: hash,
      salt,
      products: [],
    });
    return responseHandler(res, `success ${user.fullName} created`, 201, user);
    // res.status(201).send({
    //   message: "User has been created",
    //   data: user,
    // });
  } catch (error) {
    return responseHandler(
      res,
      "E-mail is already taken, try another",
      400,
      error
    );
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { id, ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateObject);
    return res.status(200).send({
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      data: error,
    });
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).send({
      message: "User deleted",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      data: error,
    });
  }
};

//GET SINGLE USER
export const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    res.status(200).send({
      message: "User retreived",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      data: error,
    });
  }
};

//GET REQUESTS
//GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).send({
    message: "Users retreived",
    data: users,
  });
};

//LOGIN
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ email: Email });
  if (!user) {
    return res.status(400).send({
      message: "Wrong email or password",
      data: null,
    });
  } else {
    const validPass = await comparePassword(Password, user.password);
    if (!validPass) {
      return res.status(400).send({
        message: "Incorrect details",
        data: null,
      });
    }
    const { _id, fullName, email, shopName } = user;
    const token = jwt.sign(
      { _id, fullName, email, shopName },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    return res.header("X-auth-token", token).status(200).send({
      message: "User login successful",
      data: user,
    });
  }
};
