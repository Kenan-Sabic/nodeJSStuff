import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  putUser,
  deleteUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",authMiddleware ,getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/:id", putUser);

export default router;
