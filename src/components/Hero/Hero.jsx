import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Link } from "react-scroll";
import { FaDownload, FaArrowRight } from "react-icons/fa6";
import profileWebp from "../../assets/images/profile.webp";
import profileJpg from "../../assets/images/profile.jpg";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
import SocialLinks from "../SocialLinks/SocialLinks";

export default function Hero() {
  const typedRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Full Stack Developer.", "React.js & Node.js Engineer.", "MERN Stack Builder.", "Programming Educator."],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* Animated blobs */}
      <div aria-hidden="true" className="blob left-[-10%] top-[10%] h-80 w-80 bg-[var(--color-primary)]" />
      <div aria-hidden="true" className="blob right-[-8%] top-[35%] h-96 w-96 bg-[var(--color-secondary)]" style={{ animationDelay: "4s" }} />
      <div aria-hidden="true" className="blob bottom-[-10%] left-[30%] h-72 w-72 bg-[var(--color-accent)]" style={{ animationDelay: "8s" }} />
      <ParticlesBackground />

      <div className="section-container relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Text column */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="eyebrow mb-5"> Welcome</span>
          <p className="mb-2 font-mono text-lg text-[var(--color-muted)]">Hello, I'm</p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="grad-text">Eng. Zeyad Hamdy</span>
          </h1>
          <div className="mt-4 h-9 font-display text-xl font-semibold text-white sm:text-2xl">
            <span ref={typedRef} />
            <span className="text-[var(--color-primary)]">|</span>
          </div>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-muted)]">
            I build modern, scalable and high-performance web applications with React.js, Node.js, Express.js and MongoDB — focused on clean code and responsive user experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href={`${import.meta.env.BASE_URL}assets/cv/Zeyad_Hamdy.pdf`}
              download="CV_Zeyad_Hamdy.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full btn-gradient px-6 py-3 font-mono text-sm font-medium text-white shadow-lg shadow-blue-500/20"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
              <motion.span animate={{ y: [0, 2, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <FaDownload size={14} />
              </motion.span>
              <span className="relative">Download CV</span>
            </motion.a>
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-70}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:border-[var(--color-secondary)]"
            >
              View Projects <FaArrowRight size={13} />
            </Link>
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-70}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-white"
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-10">
            <SocialLinks variant="row" />
          </div>
        </motion.div>

        {/* Image + terminal card column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div className="float-y relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-40 blur-2xl" />
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img
                src={profileJpg}
                alt="Portrait of Eng. Zeyad Hamdy"
                width={320}
                height={384}
                fetchPriority="high"
                decoding="async"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                }}
                className="relative h-80 w-72 rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/50 transition-transform duration-200 ease-out sm:h-96 sm:w-80"
              />
            </picture>

            {/* Signature terminal window, floating over the portrait */}
            <div className="glass grad-border absolute -bottom-6 -left-4 w-56 rounded-xl p-3 shadow-xl shadow-black/40 sm:-bottom-10 sm:-left-16 sm:w-72">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] text-[var(--color-muted)]">about.js</span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)]">const</span> dev <span className="text-white">=</span> {"{"}
                {"\n"} name: <span className="text-[var(--color-accent)]">'Zeyad'</span>,{"\n"} stack: <span className="text-[var(--color-accent)]">'MERN'</span>,{"\n"} status:{" "}
                <span className="text-[var(--color-accent)]">'open to work'</span>
                {"\n"}
                {"}"}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
