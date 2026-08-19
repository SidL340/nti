/**
 * src/pages/admin/Dashboard.jsx
 * Summary cards showing counts of projects, services, and unread messages.
 */

import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { motion }              from "framer-motion";
import {
  FolderKanban, Settings2, MessageSquare,
  ArrowRight, TrendingUp, MailOpen,
} from "lucide-react";
import { fetchProjects, fetchAllServices, fetchMessages } from "../../api/services.js";
import { useAuth } from "../../context/AuthContext.jsx";

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

export default function Dashboard() {
  const { user }  = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unread:   0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProjects(), fetchAllServices(), fetchMessages()])
      .then(([pRes, sRes, mRes]) => {
        const msgs   = mRes.data;
        const unread = msgs.filter((m) => !m.isRead).length;
        setStats({
          projects: pRes.data.length,
          services: sRes.data.length,
          messages: msgs.length,
          unread,
        });
        setRecentMessages(msgs.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Projects",   value: stats.projects, icon: FolderKanban,  to: "/admin/projects", color: "bg-blue-50   text-blue-600"   },
    { label: "Active Services",  value: stats.services, icon: Settings2,      to: "/admin/services", color: "bg-purple-50 text-purple-600" },
    { label: "Total Messages",   value: stats.messages, icon: MessageSquare,  to: "/admin/messages", color: "bg-green-50  text-green-600"  },
    { label: "Unread Messages",  value: stats.unread,   icon: MailOpen,       to: "/admin/messages", color: "bg-amber-50  text-amber-600"  },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Good day, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Here's what's happening with your website.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, to, color }, i) => (
          <motion.div
            key={label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link to={to} className="card p-6 flex items-center gap-4 group hover:shadow-card-hover block">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "—" : value}
                </p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
              <ArrowRight
                size={16}
                className="ml-auto text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-slate-900">Recent Messages</h2>
          <Link to="/admin/messages" className="text-sm text-brand-500 hover:text-brand-700 flex items-center gap-1">
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : recentMessages.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentMessages.map((msg) => (
              <div key={msg._id} className="py-3 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${msg.isRead ? "bg-slate-300" : "bg-brand-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{msg.name}</p>
                  <p className="text-xs text-slate-400 truncate">{msg.subject || "General Inquiry"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString("en-NP", { day: "numeric", month: "short" })}
                  </p>
                  {!msg.isRead && <span className="badge badge-blue text-[10px]">New</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: "/admin/projects", label: "Add New Project",  icon: TrendingUp   },
          { to: "/admin/services", label: "Manage Services",  icon: Settings2     },
          { to: "/admin/messages", label: "Read Messages",    icon: MessageSquare },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="card p-4 flex items-center gap-3 hover:shadow-card-hover transition-all group"
          >
            <Icon size={18} className="text-brand-500" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
              {label}
            </span>
            <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-brand-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
