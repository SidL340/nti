/**
 * src/pages/public/ContactPage.jsx
 * Contact info + working contact form with official office locations.
 */

import { useState }  from "react";
import { motion }    from "framer-motion";
import toast         from "react-hot-toast";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2 } from "lucide-react";
import { sendMessage } from "../../api/services.js";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const offices = [
  {
    city:    "Brindaban 01, Rautahat",
    address: "Brindaban Municipality Ward No. 01, Rautahat, Madhesh Province, Nepal",
    tag:     "Headquarters",
  },
  {
    city:    "Kathmandu",
    address: "Kathmandu Valley, Bagmati Province, Nepal",
    tag:     "Branch Office",
  },
];

const contactDetails = [
  { icon: Phone, label: "Direct Phone",   value: "+977 9812225102",          href: "tel:+9779812225102"             },
  { icon: Mail,  label: "Official Gmail", value: "nirmalatechinnovations@gmail.com", href: "mailto:nirmalatechinnovations@gmail.com" },
  { icon: Clock, label: "Working Hours",  value: "Sun – Fri: 9:00 AM – 6:00 PM (NST)", href: null                   },
];

const INITIAL = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form,     setForm]     = useState(INITIAL);
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await sendMessage(form);
      setSent(true);
      setForm(INITIAL);
      toast.success("Message sent! We'll get back to you shortly.");
    } catch {
      toast.error("Failed to send message. Please reach us directly at +977 9812225102.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl pointer-events-none"
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
            Contact & Location Details
          </h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Reach out to our team for custom web & ERP development, CCTV surveillance quotes,
            or hardware and networking support.
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* ── Left: Info & Offices ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Offices */}
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-2xl font-black text-slate-900 mb-5">Our Locations</h2>
                <div className="space-y-4">
                  {offices.map(({ city, address, tag }) => (
                    <div key={city} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Building2 size={20} className="text-brand-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-display font-bold text-slate-900 text-base">{city}</p>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700">{tag}</span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct channels */}
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-2xl font-black text-slate-900 mb-5">Get in Touch</h2>
                <div className="space-y-4">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm font-bold text-slate-800 hover:text-brand-600 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-bold text-slate-800">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-card">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 text-emerald-600">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="font-display text-3xl font-black text-slate-900 mb-2">Message Received!</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                      Thank you for contacting Nirmala Tech Innovations. Our representative will contact you via email or phone within 24 business hours.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-primary">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-black text-slate-900 mb-2">Send Us a Direct Message</h2>
                    <p className="text-sm text-slate-500 mb-8">Fill out the form below to receive a project quote or general consultation.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Full Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Ram Kumar"
                            className="form-input"
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label">Email Address <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com.np"
                            className="form-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+977 98XXXXXXXX"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label">Subject / Service Needed</label>
                          <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="e.g. CCTV Setup / Custom Web App"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Your Project Details <span className="text-red-500">*</span></label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Describe your requirements, expected timeline, and scope..."
                          className="form-input resize-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <>
                            <Send size={17} />
                            Send Inquiry to Nirmala Tech
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
