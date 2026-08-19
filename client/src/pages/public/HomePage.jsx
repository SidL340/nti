/**
 * src/pages/public/HomePage.jsx
 * Ultra-modern, richly animated homepage for Nirmala Tech Innovations Pvt. Ltd.
 */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import {
  Code2, Camera, Network, TrendingUp, GraduationCap,
  ArrowRight, CheckCircle2, Zap, Shield, Headphones,
  Star, ChevronRight, Play, Sparkles, Layers,
  Server, Cpu, ArrowUpRight, Check, ShieldCheck,
} from "lucide-react";
import { fetchProjects, fetchServices } from "../../api/services.js";

/* ── Animation Variants ────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Animated Counter Component ───────────────────────────── */
function AnimatedNumber({ target, suffix = "" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Category Icon & Color Maps ───────────────────────────── */
const categoryIcons = {
  "Software & Web Development": Code2,
  "Security & Surveillance":    Camera,
  "IT Infrastructure":          Network,
  "Digital Marketing & Media":  TrendingUp,
  "IT Education & Training":    GraduationCap,
};

const categoryColors = {
  "Software & Web Development": "from-blue-500 to-indigo-600",
  "Security & Surveillance":    "from-slate-700 to-slate-900",
  "IT Infrastructure":          "from-purple-500 to-violet-700",
  "Digital Marketing & Media":  "from-emerald-500 to-teal-600",
  "IT Education & Training":    "from-amber-500 to-orange-600",
};

const techStackList = [
  "Custom Web Apps", "MERN Stack", "ERP / CRM Systems",
  "4K CCTV Security", "Biometric Access Control", "Cloud Infrastructure",
  "Structured Networking", "SEO & Digital Ads", "Coding Bootcamps",
  "React.js & Node.js", "MongoDB Atlas", "IT Hardware Supply",
];

const workflowSteps = [
  { step: "01", title: "Consultation & Scope", desc: "We evaluate your tech needs and craft a tailor-made roadmap." },
  { step: "02", title: "Engineering & Setup", desc: "Our specialists build your software, setup networks, or install surveillance." },
  { step: "03", title: "Quality & Testing", desc: "Rigorous quality inspection, security hardening, and performance tests." },
  { step: "04", title: "Deployment & Support", desc: "Live rollout accompanied by comprehensive on-site warranty and 24/7 technical support." },
];

const testimonials = [
  { name: "Ramesh Shrestha", role: "CEO, Shrestha Enterprises", text: "Nirmala Tech Innovations automated our warehouse with a custom ERP. Their team is knowledgeable, responsive, and trustworthy." },
  { name: "Sita Adhikari",   role: "Principal, Apex Academy",  text: "The biometric attendance and CCTV installation done by Nirmala Tech Innovations was spotless. Highly recommended in Rautahat and beyond." },
  { name: "Binod Yadav",     role: "Director, Yadav Tech",     text: "Our online web portal built by Nirmala Tech has transformed our business operations. Great attention to detail and modern design." },
];

export default function HomePage() {
  const [projects,   setProjects]   = useState([]);
  const [services,   setServices]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTest, setActiveTest] = useState(0);

  useEffect(() => {
    fetchProjects({ featured: true }).then(({ data }) => setProjects(data.slice(0, 3)));
    fetchServices().then(({ data }) => {
      setServices(data);
      setCategories([...new Set(data.map((s) => s.category))]);
    });
  }, []);

  // Auto-rotate client testimonials
  useEffect(() => {
    const timer = setInterval(() => setActiveTest((p) => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════ 1. HERO SECTION ══════════════════ */}
      <section className="relative min-h-[95vh] flex items-center bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 overflow-hidden pt-28 pb-20">

        {/* Ambient Light Orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-500 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent-400 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Dot pattern */}
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-6 inline-block">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-accent-400 animate-ping" />
                  Brindaban 01, Rautahat & Kathmandu
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl sm:text-6xl xl:text-7xl font-black text-white leading-[1.08] mb-6"
              >
                Nirmala Tech{" "}
                <br />
                <span className="text-gradient">Innovations</span>
              </motion.h1>

              {/* Slogan */}
              <motion.p
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-display font-extrabold text-brand-200 mb-5"
              >
                "Your Complete Tech Partner"
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-brand-300/90 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
              >
                From custom software engineering, ERPs, and cloud architecture to high-definition CCTV security & IT infrastructure — we empower enterprises across Nepal.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59,130,246,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 text-white font-black text-base shadow-xl"
                  >
                    Start a Project <ArrowRight size={18} />
                  </motion.div>
                </Link>
                <Link to="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base transition-colors"
                  >
                    <Layers size={18} /> Explore Services
                  </motion.div>
                </Link>
              </motion.div>

              {/* Fast Stats */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
              >
                {[
                  { num: 100, suffix: "%", label: "Quality & Uptime" },
                  { num: 24,  suffix: "/7", label: "Technical Support" },
                  { num: 5,   suffix: "+", label: "Core Service Sectors" },
                  { num: 2,   suffix: "",  label: "Offices (Rautahat & KTM)" },
                ].map(({ num, suffix, label }) => (
                  <div key={label} className="p-3">
                    <p className="font-display text-3xl font-black text-white">
                      <AnimatedNumber target={num} suffix={suffix} />
                    </p>
                    <p className="text-brand-300 text-xs mt-1 font-medium">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Interactive Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              {/* Main 3D-Like Glassmorphic Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
              >
                {/* Logo Showcase Header */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-white text-lg leading-tight">
                      Nirmala Tech Innovations
                    </h3>
                    <p className="text-accent-400 text-xs font-bold uppercase tracking-wider">
                      Pvt. Ltd. • Complete Tech Partner
                    </p>
                  </div>
                </div>

                {/* Service Highlights List */}
                <div className="space-y-3 mb-6">
                  {[
                    "Custom Software & Web Platforms",
                    "CCTV & AI Biometric Systems",
                    "Enterprise ERP / CRM Automation",
                    "Cloud Hosting & Network Setup",
                    "Digital Marketing & IT Bootcamps",
                  ].map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-white/90 text-sm font-medium"
                    >
                      <CheckCircle2 size={16} className="text-accent-400 shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Performance Pill */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600/40 to-indigo-600/40 border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-brand-200 uppercase font-bold tracking-wider">Engineering Status</p>
                    <p className="text-white font-extrabold text-sm">Enterprise Active</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    100% Operational
                  </div>
                </div>
              </motion.div>

              {/* Floating Pill Top Left */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-8 bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="font-bold text-xs">Registered & Certified</p>
                  <p className="text-[11px] text-slate-500">Government of Nepal</p>
                </div>
              </motion.div>

              {/* Floating Pill Bottom Right */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-bold text-xs">Modern Tech Stack</p>
                  <p className="text-[11px] text-slate-500">Full Cloud & On-Premise</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Smooth Curved Wave Divider */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,80 C480,20 960,80 1440,20 L1440,80 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══════════════════ 2. INFINITE TECH MARQUEE ══════════════════ */}
      <section className="py-6 bg-slate-100 border-y border-slate-200 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...techStackList, ...techStackList].map((tech, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white shadow-2xs border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ 3. CORE SERVICES ══════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-brand-600 font-extrabold text-xs uppercase tracking-widest mb-3">
              Comprehensive Capabilities
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What We Do Best
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide full-lifecycle technology services — from initial architecture design to ongoing support and maintenance.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((cat, i) => {
              const Icon     = categoryIcons[cat] || Code2;
              const gradient = categoryColors[cat] || "from-brand-500 to-indigo-600";
              const catSvcs  = services.filter((s) => s.category === cat);

              return (
                <motion.div key={cat} custom={i} variants={fadeUp}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card h-full flex flex-col group relative overflow-hidden"
                  >
                    {/* Hover Glow Corner */}
                    <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md mb-6 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>

                    <h3 className="font-display font-bold text-slate-900 text-xl mb-3">
                      {cat}
                    </h3>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {catSvcs.slice(0, 3).map((s) => (
                        <li key={s._id} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                          <Check size={16} className="text-brand-500 shrink-0 mt-0.5" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:text-brand-700 transition-colors"
                      >
                        Explore Category <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ 4. WORKFLOW ROADMAP ══════════════════ */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-brand-600 font-extrabold text-xs uppercase tracking-widest mb-3">
              How We Work
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Structured 4-Step Process
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg max-w-xl mx-auto">
              Our proven execution framework ensures high reliability, transparent delivery, and continuous support.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="relative bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xs flex flex-col"
              >
                <span className="font-display font-black text-4xl text-brand-500/30 mb-4 block">
                  {step}
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 5. FEATURED PORTFOLIO ══════════════════ */}
      {projects.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <motion.p variants={fadeUp} className="text-brand-600 font-extrabold text-xs uppercase tracking-widest mb-3">
                  Proven Track Record
                </motion.p>
                <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black text-slate-900">
                  Featured Case Studies
                </motion.h2>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/portfolio" className="btn-secondary">
                  View Full Portfolio <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((p, i) => (
                <motion.div
                  key={p._id}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden group flex flex-col"
                >
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
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-md">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                      {p.description}
                    </p>

                    {p.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {p.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 font-mono font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        Live Demonstration <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════ 6. CLIENT TESTIMONIALS ══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-brand-600 font-extrabold text-xs uppercase tracking-widest mb-3">
              Trust & Feedback
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl font-black text-slate-900 mb-12">
              What Our Clients Say
            </motion.h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTest}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 rounded-3xl p-10 md:p-12 border border-slate-100 shadow-sm"
              >
                <div className="flex justify-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed mb-8 italic">
                  "{testimonials[activeTest].text}"
                </p>
                <div>
                  <p className="font-display font-bold text-slate-900 text-base">{testimonials[activeTest].name}</p>
                  <p className="text-brand-600 text-xs font-semibold uppercase tracking-wider mt-0.5">{testimonials[activeTest].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTest(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeTest ? "w-8 bg-brand-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Testimonial slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ 7. FINAL CALL TO ACTION ══════════════════ */}
      <section className="relative py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 text-white overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[140px] pointer-events-none"
        />
        <div className="absolute inset-0 grid-dots opacity-15" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
            <Zap size={14} className="text-accent-400" />
            Let's Build Together
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Elevate Your Business Infrastructure?
          </h2>
          <p className="text-brand-200 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Contact Nirmala Tech Innovations today for software development, CCTV surveillance quotes, or hardware consultation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-white text-brand-950 font-black text-base shadow-2xl"
              >
                Send Us a Message <ArrowRight size={18} />
              </motion.div>
            </Link>
            <a href="tel:+9779812225102">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base transition-colors"
              >
                Call +977 9812225102
              </motion.div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
