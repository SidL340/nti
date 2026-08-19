/**
 * src/api/axios.js
 * Configured Axios instance.
 * Automatically attaches the JWT Bearer token from localStorage to every request.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: inject token ──────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("nti_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ──────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("nti_token");
      localStorage.removeItem("nti_user");
      // Redirect to login if not already there
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
