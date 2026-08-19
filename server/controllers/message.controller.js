/**
 * controllers/message.controller.js
 * Handles contact form submissions (public POST) and admin read/delete.
 */

import asyncHandler from "express-async-handler";
import Message      from "../models/Message.js";

// ─── POST /api/messages ──────────────────────────────────────
// @desc   Submit contact form (public)
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are required");
  }
  const saved = await Message.create({ name, email, phone, subject, message });
  res.status(201).json({ message: "Message sent successfully!", data: saved });
});

// ─── GET /api/messages ───────────────────────────────────────
// @desc   Get all messages (admin)
export const getMessages = asyncHandler(async (_req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

// ─── PATCH /api/messages/:id/read ────────────────────────────
// @desc   Mark message as read (admin)
export const markAsRead = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json(msg);
});

// ─── DELETE /api/messages/:id ────────────────────────────────
// @desc   Delete a message (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json({ message: "Message deleted" });
});
