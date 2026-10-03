import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const getExternalUrl = (value) => {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}

const ProjectModal = ({ project, onClose }) => {
  const dialogRef = useRef(null)
  const reduceMotion = useReducedMotion() ?? false
  const isUnderDevelopment = project.status === 'UNDER DEVELOPMENT'

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button[aria-label="Close project details"]')?.focus()

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus()
      }
    }
  }, [onClose])

  const githubUrl = getExternalUrl(project.github)
  const demoUrl = getExternalUrl(project.liveDemo)

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="project-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-md sm:p-6"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
        className="theme-modal relative max-h-[min(88dvh,56rem)] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[24px] border border-white/10 bg-slate-950/80 p-5 shadow-[var(--shadow)] sm:rounded-[30px] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        aria-describedby="project-description"
      >
        <button
          type="button"
          aria-label="Close project details"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--border-accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="mb-6 rounded-2xl border border-[var(--border-accent)] bg-[var(--accent-muted)]/5 p-5 pr-14 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            {project.category}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 id="project-title" className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {project.title}
            </h2>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                isUnderDevelopment
                  ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
                  : 'border-[var(--border-accent)] bg-[var(--accent-muted)]/10 text-[var(--accent)]'
              }`}
            >
              {project.status || project.tag}
            </span>
          </div>
        </div>

        <div className="space-y-7 text-slate-300">
          <p id="project-description" className="text-sm leading-7 sm:text-base">
            {project.description}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {project.problem ? (
              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Problem
                </h3>
                <p className="text-sm leading-7">{project.problem}</p>
              </section>
            ) : null}
            {project.solution ? (
              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {isUnderDevelopment ? 'Current Approach' : 'Solution'}
                </h3>
                <p className="text-sm leading-7">{project.solution}</p>
              </section>
            ) : null}
          </div>

          {isUnderDevelopment ? (
            <p className="rounded-xl border border-amber-400/25 bg-amber-500/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-amber-200">
              This project is under development. Features and implementation are still in progress.
            </p>
          ) : null}

          {project.techStack?.length ? (
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="theme-chip rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {project.features?.length ? (
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Key Features
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {githubUrl || demoUrl ? (
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-secondary-button inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                >
                  GitHub <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-primary-button inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent)] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-contrast)]"
                >
                  Live Demo <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default ProjectModal
