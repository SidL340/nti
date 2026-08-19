/**
 * src/pages/public/PortfolioPage.jsx
 * Dynamic project gallery fetched from DB with animated category filter and interactive cards.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Github, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../api/services.js";

export default function PortfolioPage() {
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState("All");

  useEffect(() => {
    fetchProjects()
      .then(({ data }) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered   = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={13} className="text-accent-400" />
            Nirmala Tech Innovations Portfolio
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-5">
            Our Work & Case Studies
          </h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore software, web systems, ERP architectures, and IT infrastructure
            engineered by Nirmala Tech Innovations for clients across Nepal.
          </p>
        </motion.div>
      </section>

      {/* ── Filter ── */}
      <div className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-2 py-3.5 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  filter === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-[1.02]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-20 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card h-80 animate-pulse bg-slate-100 rounded-3xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
              <Code2 size={48} className="mx-auto mb-4 opacity-40 text-brand-500" />
              <h3 className="font-display font-bold text-slate-800 text-lg mb-1">No Projects Found</h3>
              <p className="text-sm text-slate-500 mb-6">There are currently no projects listed under this category.</p>
              <Link to="/contact" className="btn-primary">
                Discuss a New Project <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card flex flex-col h-full group"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56 bg-slate-100">
                      {p.image?.url ? (
                        <img
                          src={p.image.url}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                          <Code2 size={42} className="text-brand-300" />
                        </div>
                      )}

                      {p.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-md">
                          Featured
                        </span>
                      )}

                      {/* Hover overlay with action buttons */}
                      <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                            title="Live Demo"
                          >
                            <ExternalLink size={18} className="text-brand-700" />
                          </a>
                        )}
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                            title="Source Code"
                          >
                            <Github size={18} className="text-brand-700" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1">
                      <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-brand-50 text-brand-700 w-fit mb-3">
                        {p.category}
                      </span>
                      <h3 className="font-display font-bold text-slate-900 text-xl mb-2.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-3 flex-1 mb-5 leading-relaxed">
                        {p.description}
                      </p>

                      {p.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                          {p.techStack.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
