import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach token
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

// Response interceptor: guard against HTML fallbacks & handle 401
api.interceptors.response.use(
  (response) => {
    // If response is HTML text (e.g. from Vercel SPA rewrite on non-existent backend proxy), treat as error
    if (
      typeof response.data === "string" &&
      (response.data.trim().startsWith("<!DOCTYPE") ||
       response.data.trim().startsWith("<!doctype") ||
       response.data.trim().startsWith("<html"))
    ) {
      return Promise.reject(new Error("API returned HTML fallback instead of JSON"));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("nti_token");
      localStorage.removeItem("nti_user");
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
