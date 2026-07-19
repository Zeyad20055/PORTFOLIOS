import { useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import certificates from "../../data/certificates";

export default function Certificates() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="certificates" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">05. certificates</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Verified <span className="grad-text">Learning</span>
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll certificates left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[var(--color-secondary)]"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll certificates right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[var(--color-secondary)]"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </motion.div>

        <div ref={trackRef} className="mt-10 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass card-glow w-72 shrink-0 overflow-hidden rounded-2xl">
              <div className="h-40 overflow-hidden">
                <img src={cert.image} alt={cert.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-white">{cert.title}</h3>
                <p className="mt-1 font-mono text-xs text-[var(--color-secondary)]">{cert.organization}</p>
                <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
