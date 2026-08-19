/**
 * controllers/auth.controller.js
 * Handles admin registration (seed) and login, returning a signed JWT.
 */

import asyncHandler from "express-async-handler";
import jwt          from "jsonwebtoken";
import User         from "../models/User.js";

// ─── Helper: sign JWT ────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ─── @route  POST /api/auth/register ─────────────────────────
// @desc   Create admin user (seed / first-time only)
// @access Public (should be removed / protected after initial setup)
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error("Admin with this email already exists");
  }

  const user = await User.create({ name, email, password, role: "admin" });
  res.status(201).json({
    _id:   user._id,
    name:  user.name,
    email: user.email,
    role:  user.role,
    token: signToken(user._id),
  });
});

// ─── @route  POST /api/auth/login ────────────────────────────
// @desc   Admin login — returns JWT
// @access Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Must explicitly select password since it's set to select:false in schema
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    _id:   user._id,
    name:  user.name,
    email: user.email,
    role:  user.role,
    token: signToken(user._id),
  });
});

// ─── @route  GET /api/auth/me ─────────────────────────────────
// @desc   Get currently logged-in admin profile
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});
