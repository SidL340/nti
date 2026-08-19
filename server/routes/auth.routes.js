/**
 * routes/auth.routes.js
 */

import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getMe,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);   // Seed only — remove/protect in production
router.post("/login",    loginAdmin);
router.get("/me",        protect, getMe);

export default router;
