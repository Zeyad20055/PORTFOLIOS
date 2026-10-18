import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import certificatesData from '../../data/certificates';
import { useLanguage } from '../../context/useLanguage';

export default function Certificates() {
  const { t, isArabic } = useLanguage();
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * (isArabic ? -340 : 340), behavior: 'smooth' });
  };

  const certificates = certificatesData.map((cert) => ({
    ...cert,
    title: cert.title[isArabic ? 'ar' : 'en'],
    organization: cert.organization[isArabic ? 'ar' : 'en'],
  }));

  return (
    <section id="certificates" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">{t.certificates.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.certificates.title}</h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label={t.certificates.previous}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[var(--color-secondary)]"
            >
              <FaChevronLeft size={14} style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label={t.certificates.next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[var(--color-secondary)]"
            >
              <FaChevronRight size={14} style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }} />
            </button>
          </div>
        </motion.div>

        <div ref={trackRef} className="mt-10 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25, delay: (index % 4) * 0.04 }}
              className="glass card-glow w-72 shrink-0 overflow-hidden rounded-2xl"
            >
              <div className="h-40 overflow-hidden">
                <img src={cert.image} alt={cert.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-white">{cert.title}</h3>
                <p className="mt-1 font-mono text-xs text-[var(--color-secondary)]">{cert.organization}</p>
                <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
