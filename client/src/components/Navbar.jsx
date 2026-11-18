import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const links = [
  { to: "/",          label: "Home"      },
  { to: "/about",     label: "About Us"  },
  { to: "/services",  label: "Services"  },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Nirmala Tech Innovations" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-display font-black text-slate-900 text-base md:text-lg leading-tight tracking-tight">
              Nirmala Tech Innovations
            </p>
            <p className="text-[11px] text-blue-700 leading-none tracking-wider uppercase font-extrabold mt-0.5">
              Pvt. Ltd. • Brindaban, Rautahat
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-700 bg-blue-50 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Direct Phone & Contact Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+9779812225102"
            className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors"
          >
            <Phone size={15} className="text-blue-600" />
            +977 9812225102
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg px-4 py-4 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold ${
                  isActive ? "bg-blue-600 text-white" : "text-slate-800 hover:bg-slate-100"
                }`
              }
            >
              {label}
              <ChevronRight size={16} />
            </NavLink>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+9779812225102"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone size={15} className="text-blue-600" /> +977 9812225102
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-2.5 text-center text-sm font-bold text-white bg-blue-600 rounded-lg"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
