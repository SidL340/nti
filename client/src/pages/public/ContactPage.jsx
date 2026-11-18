import { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2 } from "lucide-react";
import { sendMessage } from "../../api/services.js";

const offices = [
  {
    city: "Brindaban 01, Rautahat",
    address: "Brindaban Municipality Ward No. 01, Rautahat, Madhesh Province, Nepal",
    tag: "Headquarters",
  },
  {
    city: "Kathmandu Valley",
    address: "Kathmandu Valley, Bagmati Province, Nepal",
    tag: "Branch Office",
  },
];

const INITIAL = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
      toast.error("Failed to send message. Please contact us directly at +977 9812225102.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 overflow-x-hidden bg-slate-950 text-slate-300">
      {/* ── Hero ── */}
      <section className="bg-slate-950 border-b border-slate-800/80 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Nirmala Tech Innovations Pvt. Ltd.
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            Contact & Office Details
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Reach out to our team for custom software scopes, CCTV surveillance quotes, or on-site IT networking support.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left: Office Locations & Channels */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Our Locations</h2>
                <div className="space-y-4">
                  {offices.map(({ city, address, tag }) => (
                    <div key={city} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-card">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-white text-base">{city}</p>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-blue-400 border border-slate-700">{tag}</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Direct Communication</h2>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-3 shadow-sm">
                    <Phone size={18} className="text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">Direct Phone</p>
                      <a href="tel:+9779812225102" className="text-sm font-bold text-slate-200 hover:text-blue-400">
                        +977 9812225102
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-3 shadow-sm">
                    <Mail size={18} className="text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">Official Gmail</p>
                      <a href="mailto:nirmalatechinnovations@gmail.com" className="text-sm font-bold text-slate-200 hover:text-blue-400">
                        nirmalatechinnovations@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-3 shadow-sm">
                    <Clock size={18} className="text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">Working Hours</p>
                      <p className="text-sm font-bold text-slate-200">Sun – Fri: 9:00 AM – 6:00 PM (NST)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-800 shadow-card">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent Successfully</h3>
                    <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                      Thank you for contacting Nirmala Tech Innovations. A representative will contact you via email or phone shortly.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-primary">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold text-white mb-2">Send an Inquiry</h2>
                    <p className="text-sm text-slate-400 mb-6">Fill out the form below to receive a project quote or general consultation.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Full Name <span className="text-red-400">*</span></label>
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
                          <label className="form-label">Email Address <span className="text-red-400">*</span></label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            className="form-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <label className="form-label">Service Required</label>
                          <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="e.g. CCTV Surveillance / Web App"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">Project Details <span className="text-red-400">*</span></label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Describe your requirements, timeline, and location..."
                          className="form-input resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3.5 mt-2"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message to Nirmala Tech
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
