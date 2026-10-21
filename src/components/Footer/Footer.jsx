import { Link } from 'react-scroll';
import SocialLinks from '../SocialLinks/SocialLinks';
import { useLanguage } from '../../context/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-white/5">
      <div className="section-container flex flex-col items-center gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="home" smooth duration={500} className="cursor-pointer font-display text-lg font-bold text-white">
            Zeyad<span className="text-[var(--color-secondary)]">.</span>Hamdy
          </Link>
          <p className="mt-2 max-w-xs text-sm text-[var(--color-muted)]">{t.hero.description}</p>
        </div>

        <ul className="flex gap-6">
          {quickLinks.map((link) => (
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


    </footer>
  );
}
