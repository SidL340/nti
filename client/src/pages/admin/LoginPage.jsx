/**
 * src/pages/admin/LoginPage.jsx
 * Standalone admin login with official logo and secure JWT auth.
 */

import { useState }    from "react";
import { useNavigate } from "react-router-dom";
import { motion }      from "framer-motion";
import toast           from "react-hot-toast";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth }     from "../../context/AuthContext.jsx";

export default function LoginPage() {
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back to Nirmala Tech Innovations Admin!");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-brand-500 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
          {/* Logo with official image */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-white p-2 shadow-xl border border-slate-100 mb-4 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="Nirmala Tech Innovations Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="font-display font-black text-slate-900 text-xl text-center leading-tight">
              Nirmala Tech Innovations
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-semibold uppercase tracking-wider">
              Pvt. Ltd. • CMS Admin Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="form-label">Admin Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@nirmalatech.com.np"
                  className="form-input pl-11"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="form-input pl-11 pr-12"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-3 disabled:opacity-60 font-bold shadow-lg shadow-brand-500/25"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Verifying Session...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck size={18} /> Sign In to Dashboard
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Brindaban 01, Rautahat & Kathmandu, Nepal
          </p>
        </div>
      </motion.div>
    </div>
  );
}
