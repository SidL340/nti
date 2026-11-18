import { Link } from "react-router-dom";
import { Award, Target, Eye, Users, CheckCircle2, ShieldCheck, MapPin, Mail, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Officially Registered IT Company
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            About Nirmala Tech Innovations
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A technology enterprise registered in Nepal, with headquarters in Brindaban 01, Rautahat and branch presence in Kathmandu — providing modern software, surveillance, and IT infrastructure solutions.
          </p>
        </div>
      </section>

      {/* ── Brand & Company Overview ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Logo Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm max-w-xs text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-xl p-2 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden mb-5">
                  <img
                    src="/logo.png"
                    alt="Nirmala Tech Innovations Pvt. Ltd."
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                  Nirmala Tech Innovations
                </h3>
                <p className="text-xs text-blue-700 font-bold mt-1">
                  Pvt. Ltd. • Brindaban 01, Rautahat
                </p>
              </div>
            </div>

            {/* Overview Details */}
            <div className="lg:col-span-8 space-y-5">
              <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider inline-block">
                Company Overview
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                "Your Complete Tech Partner"
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                <strong>Nirmala Tech Innovations Pvt. Ltd.</strong> is an officially established IT and engineering firm founded to bring reliable, modern, and accessible technology services directly to businesses, institutions, and individuals across Nepal.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                We believe that organizations deserve a single accountable partner capable of handling both digital software development (web applications, custom ERPs, database architectures) and physical infrastructure (4K CCTV surveillance, biometric access control, computer networks, and IT support).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Headquarters: Brindaban 01, Rautahat",
                  "Branch Office: Kathmandu Valley",
                  "Official Email: nirmalatechinnovations@gmail.com",
                  "Direct Phone: +977 9812225102",
                  "Custom Software & Web Engineering",
                  "Enterprise CCTV & Biometric Security",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5">
                <Target size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                To empower Nepali businesses, educational institutions, and organizations with high-performance software, modern security technologies, and dependable IT infrastructure that enhance operational productivity and security from day one.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5">
                <Eye size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                To be recognized as a leading and trusted technology partner in Madhesh and Bagmati Provinces, known for engineering integrity, practical innovation, and responsive local support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              Our Commitments
            </p>
            <h2 className="font-display text-3xl font-black text-slate-900">
              Core Operating Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Engineering Excellence",
                desc: "We write clean, maintainable code and use certified hardware built for stability and longevity.",
              },
              {
                title: "Transparent Integrity",
                desc: "No hidden charges, clear milestone-based pricing, and honest technical guidance for every client.",
              },
              {
                title: "Direct Accountability",
                desc: "We stand behind our installations and software deployments with full warranty and support.",
              },
              {
                title: "Dedicated Partnership",
                desc: "We work directly alongside you to ensure your tech infrastructure aligns with your business goals.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-black mb-4">
            Connect With Our Engineering Team
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto">
            Whether you need a custom software solution or on-site CCTV security installation, reach out to our team today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us Today
            </Link>
            <a
              href="mailto:nirmalatechinnovations@gmail.com"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
