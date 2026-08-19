import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const links = [
  { to: "/",          label: "Home"      },
  { to: "/about",     label: "About"     },
  { to: "/services",  label: "Services"  },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md border border-slate-200 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-display font-black text-slate-950 text-base md:text-lg leading-tight tracking-tight">
              Nirmala Tech Innovations
            </p>
            <p className="text-[11px] text-brand-700 leading-none tracking-wider uppercase font-extrabold">
              Pvt. Ltd. • Brindaban, Rautahat
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "text-brand-700 bg-brand-50 shadow-xs border border-brand-100"
                    : "text-slate-800 hover:text-brand-700 hover:bg-slate-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+9779812225102"
            className="flex items-center gap-1.5 text-sm font-extrabold text-slate-800 hover:text-brand-600 transition-colors"
          >
            <Phone size={15} className="text-brand-600" />
            +977 9812225102
          </a>
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-black shadow-md hover:bg-brand-700 transition-colors"
            >
              Get a Quote <ChevronRight size={15} />
            </motion.div>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-slate-900 hover:bg-slate-100"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-200 shadow-xl px-4 py-4 space-y-1.5"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                    isActive ? "bg-brand-600 text-white" : "text-slate-900 hover:bg-brand-50"
                  }`
                }
              >
                {label}
                <ChevronRight size={15} />
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
