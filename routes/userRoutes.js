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

router
    .route("/")
    .get(authMiddleware, getUsers)
    .post( createUser);

router.get("/:id", getUserById);


router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/:id", putUser);

export default router;
