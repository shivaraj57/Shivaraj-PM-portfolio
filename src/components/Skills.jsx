import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const Skills = () => {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading eyebrow="SKILLS" title="Technical Skills" subtitle="I work across systems, code, and data to translate ideas into reliable digital and embedded solutions." />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: categoryIndex * 0.05 }}
            whileHover={{ y: -4 }}
            className="theme-card group rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[var(--shadow)] backdrop-blur-sm transition duration-300 hover:border-cyan-400/40 hover:shadow-[var(--glow)]"
          >
            <h3 className="mb-5 text-lg font-semibold uppercase tracking-[0.14em] text-white">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="theme-chip inline-flex rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium tracking-[0.08em] text-slate-200 transition group-hover:border-cyan-400/50 group-hover:text-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
