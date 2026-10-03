import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BookOpenText, BriefcaseBusiness, Cpu, GraduationCap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { educationItems } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const iconMap = {
  primary: GraduationCap,
  high: BookOpenText,
  diploma: Cpu,
  degree: BriefcaseBusiness,
}

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prefersReducedMotion = useReducedMotion()
  const touchStartRef = useRef(null)

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % educationItems.length)
    }, 5000)

    return () => window.clearInterval(timerId)
  }, [activeIndex])

  const navigate = (step) => {
    setDirection(step)
    setActiveIndex((current) => (
      (current + step + educationItems.length) % educationItems.length
    ))
  }

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return
    navigate(deltaX < 0 ? 1 : -1)
  }

  const activeItem = educationItems[activeIndex]
  const ActiveIcon = iconMap[activeItem.icon]

  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgb(var(--background-rgb) / 0.28), rgb(var(--background-rgb) / 0.14))',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="relative"
      >
        <SectionHeading
          eyebrow="MY JOURNEY"
          title="From Student to Engineer"
          subtitle="Every stage of my education has been a step toward where I am today."
        />
      </motion.div>

      <div className="relative mt-10 lg:mt-14">
        <div className="mx-auto max-w-2xl">
          <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            JOURNEY {String(activeIndex + 1).padStart(2, '0')} / {String(educationItems.length).padStart(2, '0')}
          </p>

          <div
            className="mb-8 flex items-center justify-center px-2"
            role="group"
            aria-label="Journey progress"
          >
            {educationItems.map((item, index) => {
              const isReached = index <= activeIndex
              const isActive = index === activeIndex

              return (
                <div key={`${item.year}-progress`} className="flex min-w-0 flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    disabled={isActive}
                    aria-label={`Show journey stage ${index + 1}: ${item.year}`}
                    aria-current={isActive ? 'step' : undefined}
                    className="group flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <span
                      className={[
                        'h-3 w-3 rounded-full border transition-all duration-300 motion-reduce:transition-none',
                        isActive
                          ? 'theme-progress-active scale-125 border-cyan-100 bg-cyan-200 shadow-[var(--glow)]'
                          : isReached
                            ? 'theme-progress-inactive border-cyan-300/70 bg-cyan-300/70'
                            : 'theme-progress-inactive theme-indicator-inactive border-slate-600 bg-slate-800',
                      ].join(' ')}
                    />
                  </button>
                  {index < educationItems.length - 1 ? (
                    <span
                      className={[
                        'h-px flex-1 transition-colors duration-300 motion-reduce:transition-none',
                        index < activeIndex ? 'bg-cyan-300/80' : 'bg-slate-700',
                      ].join(' ')}
                    />
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="flex min-h-[560px] items-center justify-center sm:min-h-[520px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeItem.year}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 25 : -25, filter: 'blur(4px)' }
                }
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -25 : 25, filter: 'blur(4px)' }
                }
                transition={{ duration: prefersReducedMotion ? 0 : 0.52, ease: 'easeInOut' }}
                aria-live="polite"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="theme-card journey-glass-card w-full rounded-[32px] border border-[var(--border-accent)] bg-slate-950/70 p-5 shadow-[var(--shadow)] backdrop-blur-xl sm:p-7"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="theme-surface flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-100">
                      <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                      {activeItem.status ? 'B.E.' : activeItem.level}
                    </div>
                  </div>

                  {activeItem.status ? (
                    <span className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                      {activeItem.status}
                    </span>
                  ) : null}
                </div>

                <div className="mb-5 flex items-center justify-center gap-3 text-center text-2xl font-black tracking-tight text-cyan-50 sm:text-3xl lg:text-4xl">
                  <span>{activeItem.year.split(' – ')[0]}</span>
                  <span className="text-cyan-300">–</span>
                  <span>{activeItem.year.split(' – ')[1]}</span>
                </div>

                <div className="space-y-4 text-center">
                  {activeItem.degree ? (
                    <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300 sm:tracking-[0.28em]">
                      {activeItem.degree}
                    </p>
                  ) : null}

                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {activeItem.institution}
                  </h3>

                  {activeItem.university ? (
                    <p className="text-sm text-slate-300 sm:text-base">{activeItem.university}</p>
                  ) : null}

                  <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {activeItem.detail}
                  </p>

                  {activeItem.expected ? (
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                      <span>Expected</span>
                      <span className="text-cyan-200">{activeItem.expected}</span>
                    </div>
                  ) : null}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mx-auto sm:max-w-md sm:gap-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go to previous education stage"
              className="theme-secondary-button min-h-12 rounded-full border border-cyan-300/30 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:border-cyan-200/70 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:text-sm"
            >
              ← Backward
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Go to next education stage"
              className="theme-secondary-button min-h-12 rounded-full border border-cyan-300/30 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:border-cyan-200/70 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:text-sm"
            >
              Forward →
            </button>
          </div>
        </div>
      </div>

      <p
        className="relative mt-12 text-center text-lg italic text-slate-300 sm:text-xl"
      >
        Still learning. Still building. Still moving forward.
      </p>
    </section>
  )
}

export default Education
