import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 rounded-2xl shadow-card p-8 md:p-10 border border-slate-800">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-slate-950 p-1.5 shadow-sm border border-slate-800 mb-3 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="Nirmala Tech Innovations"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="font-display font-black text-white text-lg text-center leading-tight">
              Nirmala Tech Innovations
            </h1>
            <p className="text-blue-400 text-xs mt-0.5 font-bold uppercase tracking-wider">
              Pvt. Ltd. • CMS Admin Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Admin Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@nirmalatech.com.np"
                  className="form-input pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="form-input pl-10 pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-2"
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

          <p className="text-center text-xs text-slate-500 mt-6">
            Brindaban 01, Rautahat & Kathmandu, Nepal
          </p>
        </div>
      </div>
    </div>
  );
}
