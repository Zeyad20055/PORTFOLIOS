import { Link } from 'react-scroll';
import SocialLinks from '../SocialLinks/SocialLinks';

const QUICK_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="section-container flex flex-col items-center gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="home"
            smooth
            duration={500}
            className="cursor-pointer font-display text-lg font-bold text-white"
          >
            Zeyad<span className="text-[var(--color-secondary)]">.</span>Hamdy
          </Link>
          <p className="mt-2 max-w-xs text-sm text-[var(--color-muted)]">
            Full Stack Developer building modern, scalable web applications.
          </p>
        </div>

        <ul className="flex gap-6">
          {QUICK_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth
                duration={500}
                offset={-70}
                className="cursor-pointer font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <SocialLinks variant="row" />
      </div>

      <div className="border-t border-white/5 py-5">
        <p className="text-center font-mono text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} Made with ❤️ by Eng. Zeyad Hamdy
        </p>
      </div>
    </footer>
  );
}
