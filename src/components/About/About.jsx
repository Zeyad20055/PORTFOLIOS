import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const COUNTERS = [
  { id: 'c-01', label: 'Projects', value: 40, suffix: '+' },
  { id: 'c-02', label: 'Technologies', value: 15, suffix: '+' },
  { id: 'c-03', label: 'Certificates', value: 5, suffix: '+' },
  { id: 'c-04', label: 'Years Learning', value: 3, suffix: '+' },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-white">
      {count}
      <span className="text-[var(--color-secondary)]">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">01. about</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Who <span className="grad-text">I Am</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              I'm a Full Stack Developer with a background in Management
              Information Systems, passionate about building modern web
              applications using{' '}
              <span className="text-white">React.js, Node.js, Express.js and MongoDB</span>.
              I focus on writing clean, scalable code and creating
              responsive, high-performance user experiences that hold up in
              production — not just in a demo.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Alongside development, I create programming education content
              for university students, breaking down full-stack concepts in
              plain, practical terms — because the best way to master
              something is to be able to teach it clearly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass grad-border grid grid-cols-2 gap-8 rounded-2xl p-8 lg:col-span-2"
          >
            {COUNTERS.map((counter) => (
              <div key={counter.id}>
                <Counter value={counter.value} suffix={counter.suffix} />
                <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">
                  {counter.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
