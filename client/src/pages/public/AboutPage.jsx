/**
 * src/pages/public/AboutPage.jsx
 * Company mission, vision, values, founder profile, and official launch principles.
 */

import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, MapPin, CheckCircle2, ShieldCheck, Sparkles, Rocket, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const values = [
  { icon: Award,       title: "Engineering Excellence", desc: "We build systems following the latest industry standards, clean code architecture, and high performance." },
  { icon: Heart,       title: "Customer-First Integrity", desc: "Honest pricing, transparent milestones, and genuine technical advice with zero hidden costs." },
  { icon: Users,       title: "Dedicated Technical Arm", desc: "We act as your in-house IT and development department to help you navigate digital transformation." },
  { icon: Target,      title: "Pioneering Innovation",  desc: "Leveraging cutting-edge MERN stack, cloud technologies, and modern AI/CCTV security systems." },
];

const launchPillars = [
  {
    icon: Rocket,
    title: "Officially Registered & Launched",
    desc: "Established with a fresh vision to bring world-class tech services directly to businesses across Madhesh and Bagmati Provinces.",
  },
  {
    icon: Zap,
    title: "Next-Gen Tech Stacks",
    desc: "We don't use outdated frameworks — our web apps, ERPs, and cloud setups are built on fast, scalable modern technologies.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Security & Hardware",
    desc: "High-definition CCTV and biometric access control installations done with enterprise-grade durability and warranty.",
  },
  {
    icon: Clock,
    title: "Fast Response & Local Support",
    desc: "On-site and remote technical assistance from our team based in Brindaban 01, Rautahat and Kathmandu.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} className="text-accent-400" />
              Officially Launched in Nepal
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-black text-white mb-5">
            About Nirmala Tech Innovations
          </motion.h1>
          <motion.p variants={fadeUp} className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A modern technology startup registered in Brindaban 01, Rautahat and Kathmandu — dedicated to providing comprehensive, enterprise-quality IT solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Brand & Emblem Feature ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-4 flex justify-center"
            >
              <div className="relative p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-xl max-w-sm group hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Nirmala Tech Innovations Pvt. Ltd."
                  className="w-full h-auto object-contain rounded-2xl"
                />
                <div className="text-center mt-6">
                  <p className="font-display font-black text-slate-900 text-base">Nirmala Tech Innovations</p>
                  <p className="text-xs text-brand-600 font-bold tracking-wide mt-0.5">Pvt. Ltd. • Brindaban 01, Rautahat</p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-8 space-y-5">
              <span className="px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider inline-block">
                Company Overview
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                "Your Complete Tech Partner"
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                <strong>Nirmala Tech Innovations Pvt. Ltd.</strong> is a dynamic IT and software engineering company established to deliver accessible, high-performance technology services across Nepal. With our main base in <strong>Brindaban 01, Rautahat</strong> and presence in <strong>Kathmandu</strong>, we cover software development, hardware infrastructure, surveillance systems, digital marketing, and tech training.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "Headquarters: Brindaban 01, Rautahat",
                  "Branch Office: Kathmandu Valley",
                  "Official Email: nirmalatechinnovations@gmail.com",
                  "Full-stack Web, Mobile & ERP Solutions",
                  "CCTV Security & Biometric Access Systems",
                  "Hardware, Networking & IT AMC Contracts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-brand-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                label: "Our Mission",
                text: "To empower Nepali businesses, educational institutions, and individuals with reliable, modern, and affordable software and security technologies — creating digital solutions that deliver measurable value from day one.",
                col:  "text-brand-600",
              },
              {
                icon: Eye,
                label: "Our Vision",
                text: "To become Nepal's most trusted and innovative technological partner, driving digital progress from Rautahat to Kathmandu and inspiring the next wave of tech adoption and digital literacy.",
                col:  "text-brand-600",
              },
            ].map(({ icon: Icon, label, text, col }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <Icon size={24} className={col} />
                  </div>
                  <h2 className={`font-display text-2xl font-black ${col}`}>{label}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We Launched / Strategic Pillars (No fake timeline) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">Our Focus & Principles</p>
            <h2 className="font-display text-4xl font-black text-slate-900">Why Partner With Us?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {launchPillars.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-100 shadow-xs h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 text-brand-600">
                  <Icon size={26} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">Our Standards</p>
            <h2 className="font-display text-4xl font-black text-slate-900">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 text-center border border-slate-100 shadow-card h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5 text-brand-600">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct Contact CTA ── */}
      <section className="py-20 bg-brand-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
            Ready to explore custom software, CCTV installation, or IT infrastructure? Reach out to us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary px-8 py-3.5 text-base font-bold">
              Contact Us Today
            </Link>
            <a
              href="mailto:nirmalatechinnovations@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
