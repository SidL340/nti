// src/api/services.js — All API call functions grouped by resource

import api from "./axios.js";

// ── Auth ────────────────────────────────────────────────────
export const loginAdmin   = (data)        => api.post("/auth/login",    data);
export const getMe        = ()            => api.get("/auth/me");

// ── Projects ────────────────────────────────────────────────
export const fetchProjects     = (params) => api.get("/projects",    { params });
export const fetchProjectById  = (id)     => api.get(`/projects/${id}`);
export const createProject     = (data)   => api.post("/projects",   data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateProject     = (id, data) => api.put(`/projects/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProject     = (id)     => api.delete(`/projects/${id}`);

// ── Services ────────────────────────────────────────────────
export const fetchServices     = (params) => api.get("/services",     { params });
export const fetchAllServices  = ()       => api.get("/services/all");
export const fetchServiceById  = (id)     => api.get(`/services/${id}`);
export const createService     = (data)   => api.post("/services",    data);
export const updateService     = (id, d)  => api.put(`/services/${id}`, d);
export const deleteService     = (id)     => api.delete(`/services/${id}`);

// ── Messages ────────────────────────────────────────────────
export const sendMessage    = (data) => api.post("/messages",          data);
export const fetchMessages  = ()     => api.get("/messages");
export const markMessageRead= (id)   => api.patch(`/messages/${id}/read`);
export const deleteMessage  = (id)   => api.delete(`/messages/${id}`);
