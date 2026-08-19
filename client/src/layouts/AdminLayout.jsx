/**
 * src/layouts/AdminLayout.jsx
 * Sidebar + topbar layout for the Nirmala Tech Innovations admin CMS panel.
 */

import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth }                       from "../context/AuthContext.jsx";
import {
  LayoutDashboard, FolderKanban, Settings2,
  MessageSquare, LogOut, Globe, ExternalLink,
} from "lucide-react";

const navItems = [
  { to: "/admin",          icon: LayoutDashboard, label: "Dashboard",  end: true  },
  { to: "/admin/projects", icon: FolderKanban,    label: "Projects"              },
  { to: "/admin/services", icon: Settings2,        label: "Services"              },
  { to: "/admin/messages", icon: MessageSquare,    label: "Messages"              },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-brand-950 text-white flex flex-col fixed top-0 left-0 h-full z-40 shadow-2xl border-r border-brand-900">
        {/* Brand Header */}
        <div className="p-5 border-b border-brand-900 bg-brand-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-black text-xs leading-tight truncate text-white">
                Nirmala Tech Innovations
              </p>
              <p className="text-brand-400 text-[10px] uppercase font-bold tracking-wider">
                Admin CMS
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                    : "text-brand-300 hover:bg-brand-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-brand-900">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-brand-400 hover:bg-brand-900 hover:text-white transition-colors"
            >
              <Globe size={16} />
              View Live Website
              <ExternalLink size={12} className="ml-auto" />
            </Link>
          </div>
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-brand-900 bg-brand-950">
          <div className="px-4 py-2 mb-2 rounded-xl bg-brand-900/60">
            <p className="text-[11px] text-brand-400 font-medium">Logged in Administrator</p>
            <p className="text-sm font-bold text-white truncate">{user?.name || "Admin"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-slate-900 text-sm">
              Nirmala Tech Innovations Pvt. Ltd.
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold">
              Brindaban 01, Rautahat
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            CMS Portal • v1.0
          </span>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
