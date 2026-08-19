/**
 * src/pages/admin/AdminServices.jsx
 * CRUD for services. Edit inline via modal.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Settings2, ToggleLeft, ToggleRight } from "lucide-react";
import {
  fetchAllServices, createService, updateService, deleteService,
} from "../../api/services.js";

const CATEGORIES = [
  "Software & Web Development",
  "Security & Surveillance",
  "IT Infrastructure",
  "Digital Marketing & Media",
  "IT Education & Training",
];

const EMPTY_FORM = {
  title: "", category: CATEGORIES[0], shortDescription: "",
  fullDescription: "", icon: "Code2", features: "", isActive: true, order: 0,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [saving,   setSaving]   = useState(false);
  const [delId,    setDelId]    = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllServices().then(({ data }) => setServices(data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModal(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm({
      title:            s.title,
      category:         s.category,
      shortDescription: s.shortDescription,
      fullDescription:  s.fullDescription || "",
      icon:             s.icon || "Code2",
      features:         s.features?.join("\n") || "",
      isActive:         s.isActive,
      order:            s.order || 0,
    });
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
        order:    Number(form.order),
      };
      if (editing) {
        await updateService(editing._id, payload);
        toast.success("Service updated!");
      } else {
        await createService(payload);
        toast.success("Service created!");
      }
      setModal(false);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      toast.success("Service deleted.");
      setDelId(null);
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const toggleActive = async (s) => {
    try {
      await updateService(s._id, { isActive: !s.isActive });
      load();
    } catch {
      toast.error("Failed to toggle.");
    }
  };

  // Group by category for display
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = services.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-1">{services.length} total service(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
        ))}</div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const catServices = grouped[cat] || [];
            if (catServices.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{cat}</h2>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["Title", "Short Description", "Order", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {catServices.map((s) => (
                        <tr key={s._id} className="hover:bg-slate-50/50">
                          <td className="px-5 py-3.5 font-medium text-slate-800">{s.title}</td>
                          <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">{s.shortDescription}</td>
                          <td className="px-5 py-3.5 text-slate-500">{s.order}</td>
                          <td className="px-5 py-3.5">
                            <button onClick={() => toggleActive(s)} className="flex items-center gap-1.5 text-xs font-medium">
                              {s.isActive
                                ? <><ToggleRight size={18} className="text-emerald-500" /><span className="text-emerald-600">Active</span></>
                                : <><ToggleLeft  size={18} className="text-slate-400"   /><span className="text-slate-400">Inactive</span></>
                              }
                            </button>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex gap-2">
                              <button onClick={() => openEdit(s)} className="btn-ghost py-1.5 px-3 text-xs">
                                <Pencil size={13} /> Edit
                              </button>
                              <button onClick={() => setDelId(s._id)} className="btn-ghost py-1.5 px-3 text-xs text-red-500 hover:bg-red-50">
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {editing ? "Edit Service" : "Add New Service"}
                </h2>
                <button onClick={() => setModal(false)} className="btn-ghost p-2"><X size={18} /></button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="form-label">Title <span className="text-red-500">*</span></label>
                  <input type="text" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="form-input" placeholder="Custom Web Application Development" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Category</label>
                    <select value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="form-input">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Display Order</label>
                    <input type="number" value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="form-input" min={0} />
                  </div>
                </div>

                <div>
                  <label className="form-label">Short Description <span className="text-red-500">*</span></label>
                  <textarea rows={2} value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    className="form-input resize-none" required />
                </div>

                <div>
                  <label className="form-label">Full Description <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea rows={3} value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    className="form-input resize-none" />
                </div>

                <div>
                  <label className="form-label">Features <span className="text-slate-400 font-normal">(one per line)</span></label>
                  <textarea rows={4} value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    className="form-input resize-none font-mono text-xs"
                    placeholder={"Custom Web Apps\nAPI Integration\nCloud Deployment"} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Icon Name <span className="text-slate-400 font-normal">(Lucide)</span></label>
                    <input type="text" value={form.icon}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className="form-input font-mono text-xs" placeholder="Code2" />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setForm({ ...form, isActive: !form.isActive })}
                        className={`w-10 h-6 rounded-full transition-colors ${form.isActive ? "bg-brand-500" : "bg-slate-200"}`}
                      >
                        <span className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full bg-white shadow transition-transform ${form.isActive ? "translate-x-4" : ""}`} />
                      </div>
                      <span className="text-sm text-slate-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setModal(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                    {saving ? "Saving..." : editing ? "Save Changes" : "Create Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirm ── */}
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
              <h3 className="font-bold text-slate-900 mb-2">Delete Service?</h3>
              <p className="text-sm text-slate-500 mb-6">This action cannot be undone.</p>
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
