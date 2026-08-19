/**
 * src/components/Footer.jsx
 * Full-featured footer with official company logo and address details.
 * Public view only — no public admin links.
 */

import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Heart } from "lucide-react";

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
  "IT Infrastructure & Cloud",
  "Digital Marketing & SEO",
  "IT Education & Bootcamps",
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-200 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column with Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Nirmala Tech Innovations Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-black text-white text-base leading-tight block">
                  Nirmala Tech Innovations
                </span>
                <span className="text-[10px] text-brand-400 uppercase tracking-widest font-semibold block">
                  Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-300 leading-relaxed mb-6">
              Your Complete Tech Partner — delivering end-to-end IT, software engineering, and modern security infrastructure across Nepal.
            </p>
            <div className="flex gap-3">
              {[
                { href: "#", icon: Facebook  },
                { href: "#", icon: Linkedin  },
                { href: "#", icon: Instagram },
              ].map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all duration-200"
                  aria-label="Social Link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-brand-300 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-wider">Our Solutions</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-brand-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-wider">Offices & Reach</h4>
            <ul className="space-y-3.5">
              <li className="flex gap-3 items-start">
                <MapPin size={16} className="mt-1 text-brand-400 shrink-0" />
                <div className="text-sm text-brand-300">
                  <p className="font-semibold text-white">Brindaban 01, Rautahat</p>
                  <p className="text-xs text-brand-400">Madhesh Province, Nepal</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin size={16} className="mt-1 text-brand-400 shrink-0" />
                <div className="text-sm text-brand-300">
                  <p className="font-semibold text-white">Kathmandu</p>
                  <p className="text-xs text-brand-400">Bagmati Province, Nepal</p>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-brand-400 shrink-0" />
                <a href="tel:+9779812225102" className="text-sm text-brand-300 hover:text-white transition-colors">
                  +977 9812225102
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-brand-400 shrink-0" />
                <a href="mailto:nirmalatechinnovations@gmail.com" className="text-sm text-brand-300 hover:text-white transition-colors">
                  nirmalatechinnovations@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — purely corporate, no admin link */}
        <div className="mt-14 pt-8 border-t border-brand-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-400">
          <p>© {new Date().getFullYear()} Nirmala Tech Innovations Pvt. Ltd. All rights reserved. Registered in Nepal.</p>
          <p className="flex items-center gap-1 text-brand-400">
            Crafted with passion in Nepal <Heart size={12} className="text-red-400 fill-red-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
