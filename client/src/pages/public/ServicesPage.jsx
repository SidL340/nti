/**
 * src/pages/public/ServicesPage.jsx
 * Categorized service listing fetched from API with modern animations and branding.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Code2, Camera, Network, TrendingUp, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchServices } from "../../api/services.js";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const categoryMeta = {
  "Software & Web Development": { icon: Code2,        color: "from-blue-500 to-brand-600",    badge: "bg-blue-50 text-blue-700" },
  "Security & Surveillance":    { icon: Camera,       color: "from-slate-700 to-slate-900",  badge: "bg-slate-100 text-slate-700" },
  "IT Infrastructure":          { icon: Network,      color: "from-purple-500 to-purple-700",badge: "bg-purple-50 text-purple-700" },
  "Digital Marketing & Media":  { icon: TrendingUp,   color: "from-emerald-500 to-teal-600",  badge: "bg-emerald-50 text-emerald-700" },
  "IT Education & Training":    { icon: GraduationCap,color: "from-amber-500 to-orange-600",  badge: "bg-amber-50 text-amber-700" },
};

export default function ServicesPage() {
  const [services,     setServices]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchServices()
      .then(({ data }) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Object.keys(categoryMeta)];
  const filtered   = activeFilter === "All"
    ? services
    : services.filter((s) => s.category === activeFilter);

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-brand-500 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-semibold uppercase tracking-widest mb-4">
            Nirmala Tech Innovations Pvt. Ltd.
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-5">
            Our Core Services
          </h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade digital development, modern security infrastructure, and digital
            growth services tailored for businesses across Nepal.
          </p>
        </motion.div>
      </section>

      {/* ── Filter tabs ── */}
      <div className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-2 py-3.5 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === cat
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

      {/* ── Services grid ── */}
      <section className="py-20 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-8 animate-pulse h-72 bg-slate-100 rounded-3xl" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filtered.map((service, i) => {
                  const meta = categoryMeta[service.category] || {
                    icon: Code2,
                    color: "from-brand-500 to-brand-700",
                    badge: "bg-brand-50 text-brand-700",
                  };
                  const Icon = meta.icon;

                  return (
                    <motion.div
                      key={service._id}
                      layout
                      custom={i}
                      variants={fadeUp}
                      whileHover={{ y: -8, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card flex flex-col h-full group relative overflow-hidden"
                    >
                      {/* Accent glow on hover */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <Icon size={24} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${meta.badge}`}>
                          {service.category.split(" ")[0]}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-slate-900 text-xl mb-3">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                        {service.shortDescription}
                      </p>

                      {service.features?.length > 0 && (
                        <div className="space-y-2.5 pt-4 border-t border-slate-100">
                          {service.features.map((f) => (
                            <div key={f} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                              <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 pt-4">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:text-brand-700 transition-colors"
                        >
                          Request Quotation <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-gradient-to-br from-brand-900 to-brand-700 rounded-3xl text-center text-white"
          >
            <h3 className="font-display text-2xl md:text-3xl font-black mb-3">
              Need a Custom Solution?
            </h3>
            <p className="text-brand-200 text-base max-w-xl mx-auto mb-6">
              Our engineering team at Nirmala Tech Innovations can customize any architecture to your exact business requirements.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-900 font-bold rounded-2xl shadow-lg hover:bg-brand-50 transition-all hover:scale-105">
              Talk to Our Engineers <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
