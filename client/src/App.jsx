/**
 * src/App.jsx
 * Root router — defines all public and admin routes.
 * Admin routes are wrapped in <ProtectedRoute />.
 */

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth }                   from "./context/AuthContext.jsx";

// ── Layout ───────────────────────────────────────────────────
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout  from "./layouts/AdminLayout.jsx";

// ── Public Pages ─────────────────────────────────────────────
import HomePage     from "./pages/public/HomePage.jsx";
import AboutPage    from "./pages/public/AboutPage.jsx";
import ServicesPage from "./pages/public/ServicesPage.jsx";
import PortfolioPage from "./pages/public/PortfolioPage.jsx";
import ContactPage  from "./pages/public/ContactPage.jsx";

// ── Admin Pages ──────────────────────────────────────────────
import LoginPage    from "./pages/admin/LoginPage.jsx";
import Dashboard    from "./pages/admin/Dashboard.jsx";
import AdminProjects from "./pages/admin/AdminProjects.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";

// ── Protected Route guard ────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* ── Public routes ── */}
          <Route element={<PublicLayout />}>
            <Route path="/"          element={<HomePage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/services"  element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact"   element={<ContactPage />} />
          </Route>

          {/* ── Admin login (no layout) ── */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ── Protected admin routes ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index              element={<Dashboard />} />
            <Route path="projects"    element={<AdminProjects />} />
            <Route path="services"    element={<AdminServices />} />
            <Route path="messages"    element={<AdminMessages />} />
          </Route>

          {/* ── 404 fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
