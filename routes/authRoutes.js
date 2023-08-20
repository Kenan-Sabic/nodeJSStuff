import express from "express";
import { Router } from "express";
import { registerUser, logIn } from "../controller/authController.js";

const router = Router()

router.post('/register', registerUser);

router.post('/login', logIn);

export default router;