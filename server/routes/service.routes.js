/**
 * routes/service.routes.js
 */

import express from "express";
import {
  getServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",          getServices);        // public — active only
router.get("/all",       protect, getAllServices); // admin — all
router.get("/:id",       getServiceById);

router.post("/",         protect, createService);
router.put("/:id",       protect, updateService);
router.delete("/:id",    protect, deleteService);

export default router;
