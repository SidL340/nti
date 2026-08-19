/**
 * controllers/service.controller.js
 * CRUD for service offerings. Seeded on first run via a seed script.
 */

import asyncHandler from "express-async-handler";
import Service      from "../models/Service.js";

// ─── GET /api/services ───────────────────────────────────────
// @desc   Fetch all active services (public)
export const getServices = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.category) filter.category = req.query.category;
  const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
  res.json(services);
});

// ─── GET /api/services/all ───────────────────────────────────
// @desc   Fetch ALL services including inactive (admin)
export const getAllServices = asyncHandler(async (_req, res) => {
  const services = await Service.find({}).sort({ order: 1 });
  res.json(services);
});

// ─── GET /api/services/:id ───────────────────────────────────
// @desc   Fetch single service
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.json(service);
});

// ─── POST /api/services ──────────────────────────────────────
// @desc   Create service (admin)
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

// ─── PUT /api/services/:id ───────────────────────────────────
// @desc   Update service (admin)
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.json(service);
});

// ─── DELETE /api/services/:id ────────────────────────────────
// @desc   Delete service (admin)
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.json({ message: "Service deleted" });
});
