import techStack from '../../data/techStack';

// The marquee track is rendered twice back to back and animated by exactly
// half its width — that's what makes the CSS loop appear seamless. The
// keyframes/animation class live in index.css (see .marquee).
export default function TechStack() {
  return (
    <section
      aria-label="Technologies I work with"
      className="relative overflow-hidden border-y border-white/5 py-10"
    >
      <div className="marquee flex w-max items-center gap-16">
        {techStack.map(({ icon: Icon, name, color }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <Icon size={34} style={{ color }} aria-hidden="true" />
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              {name}
            </span>
          </div>
        ))}
        {/* Duplicate copy for the seamless loop — hidden from assistive tech
            so tech names aren't announced twice. */}
        {techStack.map(({ icon: Icon, name, color }) => (
          <div
            key={`${name}-dup`}
            aria-hidden="true"
            className="flex flex-col items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <Icon size={34} style={{ color }} />
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
