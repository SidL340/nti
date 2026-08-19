/**
 * server.js — Entry point for Nirmala Tech Innovations API
 * Connects to MongoDB, mounts all route groups, and starts Express.
 */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ─── Route imports ──────────────────────────────────────────
import authRoutes      from "./routes/auth.routes.js";
import projectRoutes   from "./routes/project.routes.js";
import serviceRoutes   from "./routes/service.routes.js";
import messageRoutes   from "./routes/message.routes.js";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ───────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", company: "Nirmala Tech Innovations Pvt. Ltd." });
});

// ─── API Routes ─────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/messages", messageRoutes);

// ─── 404 fallback ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global error handler ───────────────────────────────────
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// ─── DB + Server boot ───────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀  Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });
