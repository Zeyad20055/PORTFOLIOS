import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import projects from "../../data/projects";

function ProjectCard({ project, index }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setRotate({ x: y, y: x });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      className="glass card-glow group flex flex-col overflow-hidden rounded-2xl transition-transform duration-200 ease-out"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        {project.featured && <span className="absolute right-3 top-3 rounded-full bg-[var(--color-accent)]/90 px-3 py-1 font-mono text-[10px] font-semibold text-black">Featured</span>}
        <span className="absolute left-3 top-3 rounded-full glass px-3 py-1 font-mono text-[10px] text-[var(--color-secondary)]">{project.category}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-[var(--color-muted)]">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/80 transition-colors hover:text-white"
            >
              <FaGithub size={14} /> Code
            </a>
          )}
          {project.liveDemo && project.liveDemo !== "#" ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-secondary)] transition-colors hover:text-white"
            >
              <FaArrowUpRightFromSquare size={12} /> Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-muted)]/60">
              <FaArrowUpRightFromSquare size={12} /> Demo coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const categories = useMemo(() => ["All", ...new Set(projects.map((p) => p.category))], []);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="eyebrow">04. projects</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Selected <span className="grad-text">Work</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                  activeCategory === cat ? "border-[var(--color-secondary)] text-white" : "border-white/10 text-[var(--color-muted)] hover:border-white/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
