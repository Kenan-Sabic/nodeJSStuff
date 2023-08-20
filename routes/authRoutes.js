import express from "express";
import { Router } from "express";
import { registerUser, logIn, validate } from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post('/register', registerUser);

router.post('/login', logIn);

router.post('/validate' , validate)

export default router;