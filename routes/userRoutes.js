import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
} from "../controllers/users.js";
import { checkForUser } from "../middleware/users.js";
import { createUserValidation } from "../middleware/validation.js";

const router = Router();

router.post("/user/create", createUserValidation, createUser);
router.put("/user/update/:id", checkForUser, updateUser);
router.delete("/user/delete", checkForUser, deleteUser);
router.post("/user", checkForUser, getUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);

export default router;
