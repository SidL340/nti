import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2, Camera, Network, TrendingUp, GraduationCap,
  ArrowRight, CheckCircle2,
  ArrowUpRight, Check, MapPin, Phone,
} from "lucide-react";
import { fetchProjects, fetchServices } from "../../api/services.js";

const serviceCapabilities = [
  {
    title: "Software & Web Engineering",
    desc: "Custom web applications, ERP & CRM automation, portals, and robust API backends built on the MERN stack.",
    icon: Code2,
  },
  {
    title: "CCTV & Security Surveillance",
    desc: "High-definition 4K IP cameras, NVR/DVR setups, and biometric attendance systems with enterprise warranty.",
    icon: Camera,
  },
  {
    title: "IT Infrastructure & Networking",
    desc: "Structured office cabling, server racks, managed Wi-Fi networks, and complete IT hardware procurement.",
    icon: Network,
  },
  {
    title: "Digital Marketing & Branding",
    desc: "Strategic search engine optimization (SEO), social media marketing, and professional digital brand assets.",
    icon: TrendingUp,
  },
  {
    title: "IT Education & Training",
    desc: "Career-oriented practical programming bootcamps and enterprise computer literacy training programs.",
    icon: GraduationCap,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Requirement Consultation",
    desc: "We analyze your exact technical requirements and define clear project milestones and honest cost estimates.",
  },
  {
    step: "02",
    title: "Engineering & Installation",
    desc: "Our engineers build your software or deploy your physical CCTV and networking hardware to strict specifications.",
  },
  {
    step: "03",
    title: "Quality Inspection & QA",
    desc: "Full performance testing, security hardening, user acceptance verification, and staff walkthrough.",
  },
  {
    step: "04",
    title: "Handover & Warranty Support",
    desc: "Smooth operational handover with ongoing technical assistance, on-site maintenance, and direct support.",
  },
];

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects({ featured: true })
      .then((res) => {
        const d = res?.data;
        if (Array.isArray(d)) {
          setProjects(d.slice(0, 3));
        } else if (d && Array.isArray(d.data)) {
          setProjects(d.data.slice(0, 3));
        } else {
          setProjects([]);
        }
      })
      .catch(() => setProjects([]));
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="overflow-x-hidden pt-20">

      {/* ══════════════════ 1. HERO SECTION ══════════════════ */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Official Status Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Officially Registered Tech Enterprise • Nepal
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                Nirmala Tech Innovations
              </h1>

              {/* Slogan */}
              <p className="text-xl sm:text-2xl font-display font-extrabold text-blue-400 mb-6">
                "Your Complete Tech Partner"
              </p>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                We deliver enterprise custom software development, modern web portals, high-definition CCTV security surveillance, and complete IT infrastructure for businesses, schools, and organizations across Nepal.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
                >
                  Consult Our Team <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
                >
                  Explore All Services
                </Link>
              </div>

              {/* Corporate Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-slate-200 font-bold">Headquarters & Branch</p>
                    <p className="text-slate-400 text-xs">Brindaban 01, Rautahat & Kathmandu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-slate-200 font-bold">Direct Assistance</p>
                    <p className="text-slate-400 text-xs">+977 9812225102</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Company Overview Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div className="w-14 h-14 rounded-xl bg-white p-1.5 shadow-xs flex items-center justify-center shrink-0">
                    <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base leading-tight">
                      Nirmala Tech Innovations Pvt. Ltd.
                    </h3>
                    <p className="text-xs text-blue-400 font-semibold mt-0.5">
                      Company Profile & Service Scope
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-6 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>Custom Web Applications, MERN Stack & ERPs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>4K CCTV Surveillance & Biometric Access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>Structured Cabling, Routers & IT Support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>Digital Marketing, SEO & Media Production</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>Corporate IT Training & Coding Bootcamps</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Official Inquiries</p>
                    <p className="text-slate-200 font-bold text-sm">nirmalatechinnovations@gmail.com</p>
                  </div>
                  <Link to="/contact" className="text-blue-400 hover:text-blue-300 font-bold">
                    Contact Us &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ 2. CORE CAPABILITIES ══════════════════ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              Comprehensive Technology Solutions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              What We Do Best
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              From engineering scalable web platforms to physically installing enterprise-grade surveillance networks, we cover your complete digital and IT lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCapabilities.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-xl mb-3">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>
                <div>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
                  >
                    View Details <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 3. WHY PARTNER WITH US ══════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              The Nirmala Tech Advantage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We combine software development expertise with physical IT hardware mastery, offering a single accountable tech partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Local & Accessible",
                desc: "Headquartered in Brindaban 01, Rautahat with branch operations in Kathmandu for fast on-site support.",
              },
              {
                title: "Hardware + Software",
                desc: "No need for multiple contractors — we handle web development, CCTV security, and networking together.",
              },
              {
                title: "Modern Tech Standards",
                desc: "We use high-performance stacks like React, Node.js, and certified enterprise surveillance hardware.",
              },
              {
                title: "Transparent Pricing",
                desc: "Honest scopes, milestone-based execution, and full warranty support with zero hidden fees.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                  <Check size={18} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 4. WORKFLOW ROADMAP ══════════════════ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              Our Methodology
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Structured 4-Step Process
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Every project is managed with clear milestones, regular status updates, and professional execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map(({ step, title, desc }) => (
              <div key={step} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col">
                <span className="font-display font-black text-3xl text-blue-600 mb-4 block">
                  {step}
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 5. FEATURED PORTFOLIO ══════════════════ */}
      {safeProjects.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
                  Demonstrated Capabilities
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                  Featured Projects
                </h2>
              </div>
              <div>
                <Link to="/portfolio" className="btn-secondary">
                  View All Projects <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeProjects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden flex flex-col group hover:shadow-card-hover transition-all"
                >
                  <div className="relative overflow-hidden h-52 bg-slate-100">
                    {p.image?.url ? (
                      <img
                        src={p.image.url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Code2 size={40} />
                      </div>
                    )}
                    {p.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                        {p.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                      {p.description}
                    </p>

                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 mt-2"
                      >
                        Live Demonstration <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ 6. FINAL CALL TO ACTION ══════════════════ */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight">
            Ready to Upgrade Your Technology & Infrastructure?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Contact Nirmala Tech Innovations Pvt. Ltd. today for custom software quotes, CCTV security site inspections, or hardware consultation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors"
            >
              Send Us a Message
            </Link>
            <a
              href="tel:+9779812225102"
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
            >
              Call +977 9812225102
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
