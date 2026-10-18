import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaMoon, FaSun, FaXmark } from 'react-icons/fa6';
import useActiveSection from '../../hooks/useActiveSection';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/useTheme';

export default function Navbar() {
  const { t, isArabic, setLanguage } = useLanguage();
  const { isDark, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { id: 'home', label: t.nav.home },
      { id: 'about', label: t.nav.about },
      { id: 'skills', label: t.nav.skills },
      { id: 'services', label: t.nav.services },
      { id: 'projects', label: t.nav.projects },
      { id: 'certificates', label: t.nav.certificates },
      { id: 'contact', label: t.nav.contact },
    ],
    [t],
  );

  const navIds = navItems.map((item) => item.id);
  const activeId = useActiveSection(navIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <nav className="section-container flex h-18 items-center justify-between gap-4 py-4">
        <Link to="home" smooth duration={500} className="cursor-pointer font-display text-lg font-bold tracking-tight text-white">
          Zeyad<span className="text-[var(--color-secondary)]">.</span>Hamdy
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                smooth
                duration={500}
                offset={-80}
                spy
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`relative cursor-pointer font-mono text-sm transition-colors ${activeId === item.id ? 'text-[var(--color-secondary)]' : 'text-[var(--color-muted)] hover:text-white'}`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={isDark ? t.common.themeToLight : t.common.themeToDark}
            title={isDark ? t.common.themeToLight : t.common.themeToDark}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="icon-interactive flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ opacity: 0, rotate: -35, scale: 0.82 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.82 }}
                transition={{ duration: 0.16 }}
                className="inline-flex"
              >
                {isDark ? <FaSun size={14} aria-hidden="true" /> : <FaMoon size={14} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            aria-label={t.common.languageToggle}
            onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            className="icon-interactive rounded-full border border-[var(--color-border)] bg-[var(--color-soft-accent)] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text)] hover:border-[var(--color-primary)]"
          >
            {t.nav.language}
          </button>
          <Link to="contact" smooth duration={500} offset={-80} className="cursor-pointer rounded-full btn-gradient px-5 py-2 font-mono text-sm font-medium text-white">
            {t.nav.talk}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={isDark ? t.common.themeToLight : t.common.themeToDark}
            title={isDark ? t.common.themeToLight : t.common.themeToDark}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="icon-interactive flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ opacity: 0, rotate: -35, scale: 0.82 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.82 }}
                transition={{ duration: 0.16 }}
                className="inline-flex"
              >
                {isDark ? <FaSun size={13} aria-hidden="true" /> : <FaMoon size={13} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            aria-label={t.common.languageToggle}
            onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            className="icon-interactive rounded-full border border-[var(--color-border)] bg-[var(--color-soft-accent)] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]"
          >
            {t.nav.language}
          </button>
          <button className="icon-interactive text-[var(--color-text)]" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? t.common.menuClose : t.common.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-nav-menu">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -25, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 25, scale: 0.85 }}
                transition={{ duration: 0.14 }}
                className="inline-flex"
              >
                {menuOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass absolute left-0 top-full max-h-[calc(100dvh-5rem)] w-full overflow-y-auto md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.id} className="border-t border-white/5">
                <Link
                  to={item.id}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  className={`block cursor-pointer px-6 py-3 font-mono text-sm ${activeId === item.id ? 'text-[var(--color-secondary)]' : 'text-[var(--color-muted)]'}`}
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
