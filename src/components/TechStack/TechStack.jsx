import { motion } from 'framer-motion';
import techStack from '../../data/techStack';
import { useLanguage } from '../../context/useLanguage';

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.common.technologies}
      className="relative overflow-hidden border-y border-white/5 py-10"
    >
      <div className="section-container flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {techStack.map(({ icon: Icon, name }) => (
          <motion.div
            key={name}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16 }}
            className="flex flex-col items-center gap-2 opacity-75 transition-opacity hover:opacity-100"
          >
            <motion.span
              whileHover={{ rotate: 3, scale: 1.04 }}
              transition={{ duration: 0.16 }}
              className="inline-flex text-[var(--color-silver)]"
            >
              <Icon size={34} aria-hidden="true" />
            </motion.span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
