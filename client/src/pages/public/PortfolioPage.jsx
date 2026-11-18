import { useEffect, useState } from "react";
import { ExternalLink, Code2, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../api/services.js";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        const d = res?.data;
        if (Array.isArray(d)) {
          setProjects(d);
        } else if (d && Array.isArray(d.data)) {
          setProjects(d.data);
        } else {
          setProjects([]);
        }
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const categories = ["All", ...new Set(safeProjects.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "All" ? safeProjects : safeProjects.filter((p) => p.category === filter);

  return (
    <div className="pt-20 overflow-x-hidden bg-slate-950 text-slate-300">
      {/* ── Hero ── */}
      <section className="bg-slate-950 border-b border-slate-800/80 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Case Studies & Implementations
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            Our Work Portfolio
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Software systems, web platforms, ERP architectures, and infrastructure projects engineered by Nirmala Tech Innovations.
          </p>
        </div>
      </section>

      {/* ── Filter ── */}
      <div className="sticky top-20 z-40 bg-slate-950 border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-20 bg-slate-900/40 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-900 h-72 rounded-2xl border border-slate-800 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 max-w-lg mx-auto p-8 shadow-card">
              <Code2 size={40} className="mx-auto mb-3 text-slate-500" />
              <h3 className="font-display font-bold text-white text-lg mb-1">No Projects Listed Yet</h3>
              <p className="text-sm text-slate-400 mb-6">New case studies will be updated here as deployments conclude.</p>
              <Link to="/contact" className="btn-primary">
                Discuss a New Project <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => (
                <div
                  key={p._id}
                  className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-card flex flex-col hover:border-slate-700 transition-all"
                >
                  <div className="relative overflow-hidden h-52 bg-slate-950">
                    {p.image?.url ? (
                      <img
                        src={p.image.url}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-600">
                        <Code2 size={40} />
                      </div>
                    )}
                    {p.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-blue-400 border border-slate-700 w-fit mb-2">
                      {p.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3 flex-1 mb-4 leading-relaxed">
                      {p.description}
                    </p>

                    {p.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mb-3">
                        {p.techStack.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-950 text-slate-300 border border-slate-800 font-mono font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-bold text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-bold text-slate-300 hover:text-white"
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
