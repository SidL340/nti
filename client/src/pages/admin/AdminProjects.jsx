/**
 * src/pages/admin/AdminProjects.jsx
 * Full CRUD UI for portfolio projects.
 * Inline modal form for create/edit with image upload preview.
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence }      from "framer-motion";
import toast                            from "react-hot-toast";
import {
  Plus, Pencil, Trash2, X, Upload, ExternalLink,
  Code2, Star, StarOff,
} from "lucide-react";
import {
  fetchProjects, createProject, updateProject, deleteProject,
} from "../../api/services.js";

const CATEGORIES = [
  "Web Development", "Mobile App", "ERP / CRM", "E-commerce",
  "Security & Surveillance", "Networking", "Digital Marketing", "Other",
];

const EMPTY_FORM = {
  title: "", description: "", techStack: "", liveLink: "",
  githubLink: "", category: "Web Development", featured: false, order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);       // open/close
  const [editing,  setEditing]  = useState(null);        // project obj or null
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [imgFile,  setImgFile]  = useState(null);
  const [imgPrev,  setImgPrev]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [delId,    setDelId]    = useState(null);
  const fileRef = useRef();

  const load = () => {
    setLoading(true);
    fetchProjects()
      .then(({ data }) => setProjects(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setImgFile(null);
    setImgPrev(null);
    setModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title:       p.title,
      description: p.description,
      techStack:   p.techStack?.join(", ") || "",
      liveLink:    p.liveLink    || "",
      githubLink:  p.githubLink  || "",
      category:    p.category    || "Web Development",
      featured:    p.featured    || false,
      order:       p.order       || 0,
    });
    setImgPrev(p.image?.url || null);
    setImgFile(null);
    setModal(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPrev(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imgFile) fd.append("image", imgFile);

      if (editing) {
        await updateProject(editing._id, fd);
        toast.success("Project updated!");
      } else {
        await createProject(fd);
        toast.success("Project created!");
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
      await deleteProject(id);
      toast.success("Project deleted.");
      setDelId(null);
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">{projects.length} total project(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card p-16 text-center text-slate-400">
          <Code2 size={40} className="mx-auto mb-3 opacity-40" />
          <p>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["Image", "Title", "Category", "Tech Stack", "Featured", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      {p.image?.url ? (
                        <img src={p.image.url} alt={p.title} className="w-14 h-10 object-cover rounded-lg" />
                      ) : (
                        <div className="w-14 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                          <Code2 size={16} className="text-brand-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-800">{p.title}</p>
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-brand-500 flex items-center gap-1 hover:underline mt-0.5">
                          <ExternalLink size={11} /> Live link
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="badge badge-blue">{p.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack?.slice(0, 3).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-mono">{t}</span>
                        ))}
                        {p.techStack?.length > 3 && (
                          <span className="text-[10px] text-slate-400">+{p.techStack.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.featured
                        ? <Star size={16} className="text-amber-500 fill-amber-400" />
                        : <StarOff size={16} className="text-slate-300" />
                      }
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="btn-ghost py-1.5 px-3 text-xs"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <button
                          onClick={() => setDelId(p._id)}
                          className="btn-ghost py-1.5 px-3 text-xs text-red-500 hover:bg-red-50"
                        >
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
      )}

      {/* ── Create/Edit Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {editing ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setModal(false)} className="btn-ghost p-2">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* Image upload */}
                <div>
                  <label className="form-label">Project Image</label>
                  <div
                    onClick={() => fileRef.current.click()}
                    className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-brand-400 transition-colors group"
                  >
                    {imgPrev ? (
                      <img src={imgPrev} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-28 text-slate-400 group-hover:text-brand-500">
                        <Upload size={28} className="mb-2" />
                        <p className="text-sm">Click to upload image</p>
                        <p className="text-xs">JPG, PNG or WebP — max 5MB</p>
                      </div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFile}
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="form-label">Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="form-input"
                    placeholder="E-commerce Platform for XYZ"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="form-label">Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="form-input resize-none"
                    placeholder="Describe the project..."
                    required
                  />
                </div>

                {/* Category + Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="form-input"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Display Order</label>
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="form-input"
                      min={0}
                    />
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="form-label">Tech Stack <span className="text-slate-400 font-normal">(comma-separated)</span></label>
                  <input
                    type="text"
                    value={form.techStack}
                    onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                    className="form-input"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Live URL</label>
                    <input
                      type="url"
                      value={form.liveLink}
                      onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                      className="form-input"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="form-label">GitHub URL</label>
                    <input
                      type="url"
                      value={form.githubLink}
                      onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                      className="form-input"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                {/* Featured toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
                      form.featured ? "bg-brand-500" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        form.featured ? "translate-x-4" : ""
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Featured on homepage</span>
                </label>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                    {saving
                      ? <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Saving...</span>
                      : editing ? "Save Changes" : "Create Project"
                    }
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {delId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={26} className="text-red-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Delete Project?</h3>
              <p className="text-sm text-slate-500 mb-6">
                This will permanently remove the project and its image. This action cannot be undone.
              </p>
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
