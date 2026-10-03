import { motion } from 'framer-motion'
import { experienceItems } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const Experience = () => {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading eyebrow="EXPERIENCE" title="Learning, building, and iterating" subtitle="A practical engineering journey shaped by embedded work, software projects, and problem-solving across disciplines." />
      </motion.div>

      <div className="theme-timeline-line relative mt-12 space-y-8 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-400/40 before:via-white/15 before:to-transparent md:before:left-1/2">
        {experienceItems.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative flex items-center"
          >
            <div className="hidden md:block md:w-1/2 md:pr-10">
              {index % 2 === 0 ? (
                <div className="theme-card rounded-3xl border border-white/10 bg-white/4 p-6 text-right shadow-[var(--shadow)]">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300">{item.type}</p>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-300">{item.detail}</p>
                </div>
              ) : null}
            </div>

            <div className={`theme-experience-indicator relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950 text-cyan-300 shadow-[var(--glow)] md:mx-auto ${index === 0 ? 'theme-indicator-active' : 'theme-indicator-inactive'}`}>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </div>

            <div className="md:w-1/2 md:pl-10">
              {index % 2 !== 0 ? (
                <div className="theme-card rounded-3xl border border-white/10 bg-white/4 p-6 shadow-[var(--shadow)]">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300">{item.type}</p>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-300">{item.detail}</p>
                </div>
              ) : (
                <div className="theme-card rounded-3xl border border-white/10 bg-white/4 p-6 shadow-[var(--shadow)] md:hidden">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300">{item.type}</p>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-300">{item.detail}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
