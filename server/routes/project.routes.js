/**
 * routes/project.routes.js
 * Public: GET (all, single)
 * Protected: POST, PUT, DELETE (admin only)
 */

import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import protect        from "../middleware/auth.middleware.js";
import { upload }     from "../config/cloudinary.js";

const router = express.Router();

router.get("/",    getProjects);
router.get("/:id", getProjectById);

// Admin-protected routes (with optional image upload)
router.post("/",    protect, upload.single("image"), createProject);
router.put("/:id",  protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
