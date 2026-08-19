/**
 * src/components/Navbar.jsx — Premium animated navbar with official logo
 */

import { useState, useEffect } from "react";
import { NavLink, Link }       from "react-router-dom";
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
  const [open,     setOpen]     = useState(false);
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-8">

        {/* ── Logo with Official Emblem ── */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-2xl bg-white p-1 shadow-md border border-slate-100 group-hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Nirmala Tech Innovations Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-display font-black text-slate-900 text-base md:text-lg leading-tight tracking-tight">
              Nirmala Tech Innovations
            </p>
            <p className="text-[10px] text-brand-500 leading-none tracking-widest uppercase font-bold">
              Pvt. Ltd. • Brindaban, Rautahat
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-brand-600 bg-brand-50 shadow-xs"
                    : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+9779812225102"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <Phone size={14} className="text-brand-500" />
            +977 9812225102
          </a>
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-bold shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-colors"
            >
              Get a Quote <ChevronRight size={14} />
            </motion.div>
          </Link>
        </div>

        {/* ── Mobile burger ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-500 text-white"
                          : "text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                      }`
                    }
                  >
                    {label}
                    <ChevronRight size={14} className="opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
                className="pt-2"
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-500 text-white font-bold text-sm shadow-md"
                >
                  Get a Free Quote <ChevronRight size={14} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
