import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/useLanguage';

export default function Loader({ loading }) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={t.common.loadingPortfolio}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-sm tracking-widest text-[var(--color-secondary)]">
              <span className="text-[var(--color-primary)]">zeyad@portfolio</span> <span className="text-white">~ %</span>
            </motion.span>

            <div className="flex items-center gap-2">
              <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-3xl font-bold tracking-wide">
                <span className="text-white">{t.loader.initializing}</span> <span className="text-[var(--color-primary)]">{t.loader.portfolio}</span>
              </motion.h1>

              <span className="h-7 w-[2px] bg-[var(--color-primary)] caret-blink" />
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.5 }} className="text-center text-sm tracking-[0.3em] uppercase text-[var(--color-secondary)]">
              {t.loader.subtitle}
            </motion.p>

            <div className="h-[4px] w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[#FFD700] to-[var(--color-secondary)]"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8,
              }}
              className="font-mono text-xs tracking-[0.25em] text-[var(--color-primary)]"
            >
              {t.loader.loadingExperience.toUpperCase()}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
