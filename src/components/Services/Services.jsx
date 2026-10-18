import { motion } from 'framer-motion';
import servicesList from '../../data/services';
import { useLanguage } from '../../context/useLanguage';

export default function Services() {
  const { t, isArabic } = useLanguage();

  const services = servicesList.map((service) => ({
    ...service,
    title: service.title[isArabic ? 'ar' : 'en'],
    description: service.description[isArabic ? 'ar' : 'en'],
  }));

  return (
    <section id="services" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.services.title}</h2>
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
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.16 }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-soft-accent)] text-[var(--color-secondary)]"
              >
                <Icon size={20} />
              </motion.div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
