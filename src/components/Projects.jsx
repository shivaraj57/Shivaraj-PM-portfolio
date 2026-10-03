import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { projects } from '../data/portfolioData'
import ProjectModal from './ProjectModal'
import SectionHeading from './SectionHeading'

const filters = [
  { label: 'ALL', value: 'ALL' },
  { label: 'SOFTWARE', value: 'SOFTWARE' },
  { label: 'AI / ML', value: 'AI/ML' },
  { label: 'EMBEDDED', value: 'EMBEDDED' },
]

const visualStyles = {
  emotion: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.18), rgb(var(--accent-secondary-rgb) / 0.08))',
  spam: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.18), rgb(var(--accent-secondary-rgb) / 0.08))',
  agri: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.18), rgb(var(--accent-secondary-rgb) / 0.08))',
  chat: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.18), rgb(var(--accent-secondary-rgb) / 0.08))',
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState(null)
  const reduceMotion = useReducedMotion() ?? false

  const handleCardPointerMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== 'mouse' ||
      document.documentElement.dataset.visualMode === 'performance'
    ) {
      return
    }

    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const maxTilt = document.documentElement.dataset.visualMode === 'balanced' ? 1.5 : 2.8
    card.style.setProperty('--card-tilt-x', `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`)
    card.style.setProperty('--card-tilt-y', `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`)
  }

  const resetCardTilt = (event) => {
    event.currentTarget.style.setProperty('--card-tilt-x', '0deg')
    event.currentTarget.style.setProperty('--card-tilt-y', '0deg')
  }

  const closeProject = useCallback(() => setSelectedProject(null), [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading eyebrow="FEATURED PROJECTS" title="Things I've built and am currently developing." subtitle="Things I've built and am currently developing." />
      </motion.div>

      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
              activeFilter === filter.value
                ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-200'
                : 'border-white/10 bg-white/4 text-slate-300 hover:border-cyan-400/40 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={resetCardTilt}
              style={{
                rotateX: 'var(--card-tilt-x, 0deg)',
                rotateY: 'var(--card-tilt-y, 0deg)',
                transformPerspective: 1100,
              }}
              className="theme-card project-glass-card group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/50 p-3 shadow-[var(--shadow)] backdrop-blur-sm"
            >
              <div
                className="theme-project-art relative overflow-hidden rounded-[22px] border border-white/10 p-5"
                style={{ background: visualStyles[project.visual] }}
              >
                <div className="project-visual-glow absolute inset-0" />
                <div className="relative flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      project.status === 'UNDER DEVELOPMENT'
                        ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
                        : 'border-white/10 bg-slate-950/60 text-cyan-200'
                    }`}
                  >
                    {project.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/80 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div className="relative mt-12 flex min-h-[152px] flex-col justify-end">
                  <div className="theme-surface mb-3 h-16 w-16 rounded-2xl border border-white/10 bg-slate-950/70 p-3 shadow-[var(--glow)]">
                    <div className="flex h-full items-center justify-center rounded-xl bg-cyan-400/10 text-xl font-black text-cyan-300">
                      {project.title[0]}
                    </div>
                  </div>
                  <h3 className="max-w-[80%] text-2xl font-black tracking-tight text-white">{project.title}</h3>
                </div>
              </div>

              <div className="px-2 pb-2 pt-5">
                <p className="text-sm leading-7 text-slate-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="theme-chip rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="theme-secondary-button inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {selectedProject ? (
        <ProjectModal
          key={selectedProject.id}
          project={selectedProject}
          onClose={closeProject}
        />
      ) : null}
    </section>
  )
}

export default Projects
