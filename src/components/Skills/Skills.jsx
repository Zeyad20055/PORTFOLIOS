import { motion } from 'framer-motion';
import { frontendSkills, backendSkills } from '../../data/skills';

function SkillGroup({ title, skills, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      className="glass card-glow rounded-2xl p-6 sm:p-8"
    >
      <h3 className="mb-6 font-display text-xl font-semibold text-white">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
              <span className="text-white/90">{skill.name}</span>
              <span className="text-[var(--color-secondary)]">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">02. skills</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            What I <span className="grad-text">Work With</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <SkillGroup title="Front-End" skills={frontendSkills} delay={0.05} />
          <SkillGroup title="Back-End" skills={backendSkills} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
