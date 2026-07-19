import { motion } from 'framer-motion';
import services from '../../data/services';

export default function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">03. services</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            How I Can <span className="grad-text">Help</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, description, icon: Icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="glass card-glow group rounded-2xl p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 text-[var(--color-secondary)] transition-transform group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
