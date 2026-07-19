import { motion, AnimatePresence } from 'framer-motion';

// Full-screen loading sequence shown once while the page's first paint
// settles in. Mirrors the terminal motif used in the Hero section.
export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="font-mono text-sm text-[var(--color-secondary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              zeyad@dev ~ %
            </motion.span>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold text-white">
                booting portfolio
              </span>
              <span className="h-6 w-[2px] bg-[var(--color-primary)] caret-blink" />
            </div>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
