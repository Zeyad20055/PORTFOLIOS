import socialLinks from '../../data/socialLinks';

// mailto:/tel: links shouldn't open in a new tab — target="_blank" on them
// can leave a blank tab behind in some browsers once the mail/phone app
// takes over. Only true external http(s) links get target="_blank".
const isExternal = (href) => href.startsWith('http');

// variant "row": small icon buttons used in the Hero / Footer
// variant "block": labeled list used in the Contact section
export default function SocialLinks({ variant = 'row' }) {
  if (variant === 'block') {
    return (
      <ul className="flex flex-col gap-3">
        {socialLinks.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <a
              href={href}
              target={isExternal(href) ? '_blank' : undefined}
              rel={isExternal(href) ? 'noopener noreferrer' : undefined}
              data-cursor-hover
              className="group flex items-center gap-3 font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[var(--color-secondary)] transition-colors group-hover:border-[var(--color-secondary)]">
                <Icon size={15} aria-hidden="true" />
              </span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {socialLinks.map(({ id, label, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            target={isExternal(href) ? '_blank' : undefined}
            rel={isExternal(href) ? 'noopener noreferrer' : undefined}
            aria-label={label}
            data-cursor-hover
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-all hover:-translate-y-1 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            <Icon size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
