import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import useActiveSection from "../../hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

// Precomputed once at module scope so the id list passed to
// useActiveSection keeps a stable reference across renders — otherwise a
// fresh array from .map() on every render would tear down and rebuild the
// IntersectionObserver on every state change.
const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <nav className="section-container flex h-18 items-center justify-between py-4">
        <Link to="home" smooth duration={500} className="cursor-pointer font-display text-lg font-bold tracking-tight text-white">
          Zeyad<span className="text-[var(--color-secondary)]">.</span>Hamdy
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                smooth
                duration={500}
                offset={-80}
                spy
                aria-current={activeId === item.id ? "true" : undefined}
                className={`relative cursor-pointer font-mono text-sm transition-colors ${activeId === item.id ? "text-white" : "text-[var(--color-muted)] hover:text-white"}`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="contact" smooth duration={500} offset={-80} className="hidden cursor-pointer rounded-full btn-gradient px-5 py-2 font-mono text-sm font-medium text-white md:inline-block">
          Let's Talk
        </Link>

        <button className="text-white md:hidden" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="mobile-nav-menu">
          {menuOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul id="mobile-nav-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="glass overflow-hidden md:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="border-t border-white/5">
                <Link
                  to={item.id}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  className={`block cursor-pointer px-6 py-3 font-mono text-sm ${activeId === item.id ? "text-white" : "text-[var(--color-muted)]"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
