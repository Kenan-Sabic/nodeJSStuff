import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  putUser,
  deleteUser,
} from "../controller/userController.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/:id", putUser);

export default router;
