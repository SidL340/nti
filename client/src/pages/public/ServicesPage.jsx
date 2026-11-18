import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Code2, Camera, Network, TrendingUp, GraduationCap, ArrowRight } from "lucide-react";
import { fetchServices } from "../../api/services.js";

const categoryMeta = {
  "Software & Web Development": { icon: Code2,        badge: "bg-blue-50 text-blue-700 border-blue-200" },
  "Security & Surveillance":    { icon: Camera,       badge: "bg-slate-100 text-slate-800 border-slate-300" },
  "IT Infrastructure":          { icon: Network,      badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  "Digital Marketing & Media":  { icon: TrendingUp,   badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "IT Education & Training":    { icon: GraduationCap,badge: "bg-amber-50 text-amber-800 border-amber-200" },
};

const defaultServices = [
  {
    _id: "s1",
    title: "Custom Web Application & Portal Development",
    category: "Software & Web Development",
    shortDescription: "Tailor-made web applications, business portals, and cloud solutions engineered with modern MERN stack.",
    features: ["Responsive design", "Secure authentication", "RESTful API backends", "Scalable database schema"],
  },
  {
    _id: "s2",
    title: "Enterprise ERP & Management Systems",
    category: "Software & Web Development",
    shortDescription: "Streamline accounts, inventory, HR, and sales operations with centralized software architectures.",
    features: ["Role-based access", "Automated invoicing", "Real-time analytics", "Local data backup"],
  },
  {
    _id: "s3",
    title: "4K CCTV Surveillance & NVR Setup",
    category: "Security & Surveillance",
    shortDescription: "Complete enterprise-grade security camera installation with night-vision, remote mobile viewing, and warranty.",
    features: ["High-definition IP cameras", "Remote phone streaming", "Continuous recording backup", "On-site maintenance"],
  },
  {
    _id: "s4",
    title: "Biometric Attendance & Access Control",
    category: "Security & Surveillance",
    shortDescription: "Fingerprint and facial recognition access control systems for offices, schools, and institutions.",
    features: ["Automated timesheets", "Door lock integration", "Exportable payroll reports", "Multi-branch sync"],
  },
  {
    _id: "s5",
    title: "Structured Cabling & Server Network Racks",
    category: "IT Infrastructure",
    shortDescription: "Professional enterprise network cabling, patch panels, server racks, and high-speed routing.",
    features: ["Cat6 Gigabit cabling", "Server rack organization", "Managed Wi-Fi coverage", "Bandwidth optimization"],
  },
  {
    _id: "s6",
    title: "Computer Hardware & IT AMC Support",
    category: "IT Infrastructure",
    shortDescription: "Supply, setup, and annual maintenance contracts (AMC) for desktops, laptops, printers, and UPS power.",
    features: ["Original hardware procurement", "Regular preventive maintenance", "Quick emergency response", "Hardware repair"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchServices()
      .then((res) => {
        const d = res?.data;
        if (Array.isArray(d) && d.length > 0) {
          setServices(d);
        } else if (d && Array.isArray(d.data) && d.data.length > 0) {
          setServices(d.data);
        } else {
          setServices(defaultServices);
        }
      })
      .catch(() => setServices(defaultServices))
      .finally(() => setLoading(false));
  }, []);

  const safeServices = Array.isArray(services) && services.length > 0 ? services : defaultServices;
  const categories = ["All", ...Object.keys(categoryMeta)];
  const filtered = activeFilter === "All"
    ? safeServices
    : safeServices.filter((s) => s.category === activeFilter);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Capabilities & Service Offerings
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            Our Technology Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise software engineering, modern web applications, high-definition CCTV security, networking, and digital growth services tailored for Nepali enterprises.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="py-20 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((service) => {
                const meta = categoryMeta[service.category] || {
                  icon: Code2,
                  badge: "bg-slate-100 text-slate-800 border-slate-300",
                };
                const Icon = meta.icon;

                return (
                  <div
                    key={service._id}
                    className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card flex flex-col h-full hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${meta.badge}`}>
                        {service.category.split(" ")[0]}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-slate-900 text-xl mb-3">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {service.shortDescription}
                    </p>

                    {service.features?.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
                      >
                        Request Consultation <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Card */}
          <div className="mt-16 p-10 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">
              Need a Customized Technical Scope?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
              Our engineering team can create customized architectures and pricing models tailored to your exact organizational needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              Contact Our Engineers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
