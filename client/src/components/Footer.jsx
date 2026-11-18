import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { to: "/",          label: "Home"      },
  { to: "/about",     label: "About Us"  },
  { to: "/services",  label: "Services"  },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact",   label: "Contact"   },
];

const services = [
  "Software & Web Development",
  "CCTV & Biometric Systems",
  "IT Infrastructure & Networking",
  "Digital Marketing & SEO",
  "IT Education & Training",
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 p-1 border border-slate-800 shadow-sm flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-black text-white text-base leading-tight block">
                  Nirmala Tech Innovations
                </span>
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold block">
                  Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              "Your Complete Tech Partner" — enterprise software development, CCTV surveillance, and IT infrastructure solutions across Nepal.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-xs uppercase tracking-wider">Our Solutions</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-sm text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-xs uppercase tracking-wider">Office & Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-xs">Headquarters</p>
                  <p className="text-slate-400 text-xs">Brindaban 01, Rautahat, Madhesh</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-xs">Branch Office</p>
                  <p className="text-slate-400 text-xs">Kathmandu Valley, Bagmati</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <a href="tel:+9779812225102" className="hover:text-white transition-colors">
                  +977 9812225102
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <a href="mailto:nirmalatechinnovations@gmail.com" className="hover:text-white transition-colors">
                  nirmalatechinnovations@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nirmala Tech Innovations Pvt. Ltd. All rights reserved.</p>
          <p>Brindaban 01, Rautahat & Kathmandu, Nepal</p>
        </div>
      </div>
    </footer>
  );
}
