/**
 * controllers/project.controller.js
 * Full CRUD for portfolio projects.
 * Images are uploaded to Cloudinary via the uploadToCloudinary helper.
 */

import asyncHandler            from "express-async-handler";
import Project                 from "../models/Project.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.js";

// ── GET /api/projects ────────────────────────────────────────
export const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;
  if (req.query.category)            filter.category = req.query.category;
  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

// ── GET /api/projects/:id ────────────────────────────────────
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error("Project not found"); }
  res.json(project);
});

// ── POST /api/projects ───────────────────────────────────────
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack, liveLink, githubLink, category, featured, order } = req.body;

  let imageData = { url: "", publicId: "" };
  if (req.file) {
    imageData = await uploadToCloudinary(req.file.buffer);
  }

  const project = await Project.create({
    title,
    description,
    image:     imageData,
    techStack: typeof techStack === "string"
      ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
      : techStack || [],
    liveLink,
    githubLink,
    category,
    featured:  featured === "true" || featured === true,
    order:     Number(order) || 0,
  });

  res.status(201).json(project);
});

// ── PUT /api/projects/:id ────────────────────────────────────
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error("Project not found"); }

  const { title, description, techStack, liveLink, githubLink, category, featured, order } = req.body;

  // New image uploaded → delete old from Cloudinary, upload new
  if (req.file) {
    if (project.image?.publicId) {
      await cloudinary.uploader.destroy(project.image.publicId);
    }
    project.image = await uploadToCloudinary(req.file.buffer);
  }

  project.title       = title       ?? project.title;
  project.description = description ?? project.description;
  project.techStack   = techStack
    ? (typeof techStack === "string"
        ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
        : techStack)
    : project.techStack;
  project.liveLink    = liveLink    ?? project.liveLink;
  project.githubLink  = githubLink  ?? project.githubLink;
  project.category    = category    || project.category;
  project.featured    = featured !== undefined
    ? (featured === "true" || featured === true)
    : project.featured;
  project.order       = order !== undefined ? Number(order) : project.order;

  const updated = await project.save();
  res.json(updated);
});

// ── DELETE /api/projects/:id ─────────────────────────────────
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error("Project not found"); }

  if (project.image?.publicId) {
    await cloudinary.uploader.destroy(project.image.publicId);
  }
  await project.deleteOne();
  res.json({ message: "Project deleted successfully" });
});
