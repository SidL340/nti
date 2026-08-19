/**
 * src/pages/admin/AdminMessages.jsx
 * Read, mark-as-read, and delete contact form submissions.
 */

import { useEffect, useState }     from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast                       from "react-hot-toast";
import {
  Mail, MailOpen, Trash2, Phone, User,
  Clock, ChevronDown, ChevronUp, X,
} from "lucide-react";
import {
  fetchMessages, markMessageRead, deleteMessage,
} from "../../api/services.js";

export default function AdminMessages() {
  const [messages,  setMessages]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [expanded,  setExpanded]  = useState(null);  // message _id
  const [delId,     setDelId]     = useState(null);
  const [filter,    setFilter]    = useState("all"); // all | unread | read

  const load = () => {
    setLoading(true);
    fetchMessages().then(({ data }) => setMessages(data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRead = async (id) => {
    try {
      await markMessageRead(id);
      load();
    } catch {
      toast.error("Failed to mark as read.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      toast.success("Message deleted.");
      setDelId(null);
      if (expanded === id) setExpanded(null);
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.isRead;
    if (filter === "read")   return m.isRead;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">
            {messages.length} total &nbsp;·&nbsp;
            <span className="text-brand-600 font-medium">{unreadCount} unread</span>
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6">
        {[
          { key: "all",    label: `All (${messages.length})`       },
          { key: "unread", label: `Unread (${unreadCount})`         },
          { key: "read",   label: `Read (${messages.length - unreadCount})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === key ? "bg-brand-500 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
        ))}</div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center text-slate-400">
          <Mail size={40} className="mx-auto mb-3 opacity-40" />
          <p>No messages in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((msg) => (
              <motion.div
                key={msg._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className={`card overflow-hidden ${!msg.isRead ? "border-l-4 border-l-brand-500" : ""}`}>
                  {/* Row header */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                    onClick={() => {
                      setExpanded(expanded === msg._id ? null : msg._id);
                      if (!msg.isRead) handleRead(msg._id);
                    }}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <span className="font-bold text-brand-600 text-sm">
                        {msg.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className={`text-sm font-medium ${msg.isRead ? "text-slate-700" : "text-slate-900"}`}>
                          {msg.name}
                        </p>
                        {!msg.isRead && <span className="badge badge-blue text-[10px]">New</span>}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        <span className="font-medium text-slate-600">{msg.subject || "General Inquiry"}</span>
                        {" — "}{msg.message.slice(0, 60)}{msg.message.length > 60 ? "..." : ""}
                      </p>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                      <p className="text-xs text-slate-400">
                        {new Date(msg.createdAt).toLocaleDateString("en-NP", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                      {expanded === msg._id
                        ? <ChevronUp  size={15} className="text-slate-400" />
                        : <ChevronDown size={15} className="text-slate-400" />
                      }
                    </div>
                  </div>

                  {/* Expanded body */}
                  <AnimatePresence>
                    {expanded === msg._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-5 py-5">
                          {/* Meta info */}
                          <div className="flex flex-wrap gap-4 mb-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <User size={14} className="text-slate-400" />
                              {msg.name}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Mail size={14} className="text-slate-400" />
                              <a href={`mailto:${msg.email}`} className="hover:text-brand-600 transition-colors">{msg.email}</a>
                            </div>
                            {msg.phone && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone size={14} className="text-slate-400" />
                                <a href={`tel:${msg.phone}`} className="hover:text-brand-600 transition-colors">{msg.phone}</a>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Clock size={14} />
                              {new Date(msg.createdAt).toLocaleString("en-NP")}
                            </div>
                          </div>

                          {/* Message body */}
                          <div className="bg-slate-50 rounded-xl p-4 mb-5">
                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your Inquiry"}`}
                              className="btn-primary py-2 text-xs"
                            >
                              <Mail size={13} /> Reply via Email
                            </a>
                            {!msg.isRead && (
                              <button onClick={() => handleRead(msg._id)} className="btn-secondary py-2 text-xs">
                                <MailOpen size={13} /> Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => setDelId(msg._id)}
                              className="btn-ghost py-2 text-xs text-red-500 hover:bg-red-50 ml-auto"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirm */}
      <AnimatePresence>
        {delId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={26} className="text-red-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Delete Message?</h3>
              <p className="text-sm text-slate-500 mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDelId(null)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={() => handleDelete(delId)} className="btn-danger flex-1">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
