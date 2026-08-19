/**
 * routes/message.routes.js
 */

import express from "express";
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from "../controllers/message.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",              createMessage);           // public — contact form
router.get("/",               protect, getMessages);    // admin
router.patch("/:id/read",     protect, markAsRead);     // admin
router.delete("/:id",         protect, deleteMessage);  // admin

export default router;
