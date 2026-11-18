import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("UI Error caught by boundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-display font-bold text-slate-900 text-xl mb-2">Something went wrong</h2>
            <p className="text-slate-600 text-sm mb-6">The application encountered a temporary error. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  return user ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Standalone Admin Login */}
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

            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
