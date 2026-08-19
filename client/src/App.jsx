import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout  from "./layouts/AdminLayout.jsx";

import HomePage      from "./pages/public/HomePage.jsx";
import AboutPage     from "./pages/public/AboutPage.jsx";
import ServicesPage  from "./pages/public/ServicesPage.jsx";
import PortfolioPage from "./pages/public/PortfolioPage.jsx";
import ContactPage   from "./pages/public/ContactPage.jsx";

import LoginPage     from "./pages/admin/LoginPage.jsx";
import Dashboard     from "./pages/admin/Dashboard.jsx";
import AdminProjects from "./pages/admin/AdminProjects.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-8 h-8 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  return user ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Standalone Admin Login Route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin CMS Panel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
