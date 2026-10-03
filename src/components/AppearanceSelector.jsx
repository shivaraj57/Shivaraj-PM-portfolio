import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Palette, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { themes } from '../contexts/themeOptions'
import { useTheme } from '../contexts/useTheme'

const AppearanceSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { theme, setTheme, visualMode, setVisualMode } = useTheme()
  const visualModes = [
    { id: 'cinematic', name: 'Cinematic', description: 'Full liquid and light effects' },
    { id: 'balanced', name: 'Balanced', description: 'A quieter visual balance' },
    { id: 'performance', name: 'Performance', description: 'Reduced visual effects' },
  ]

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnOutsidePress = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="static md:relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Appearance"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition-colors hover:border-[var(--border-accent)] hover:bg-cyan-400/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-4"
      >
        <Sparkles size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Appearance</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-labelledby="appearance-title"
            aria-describedby="appearance-description"
            className="theme-panel absolute right-0 top-[calc(100%+0.75rem)] z-[60] max-h-[min(72vh,38rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-[var(--border-accent)] bg-slate-950/95 p-4 shadow-[var(--shadow)] backdrop-blur-2xl sm:p-5"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-accent)] bg-cyan-400/5 text-cyan-200">
                <Palette size={16} aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="appearance-title"
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-white"
                >
                  Appearance
                </h2>
                <p id="appearance-description" className="mt-1 text-xs text-slate-300">
                  Choose your visual identity
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((item) => {
                const isActive = theme === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setTheme(item.id)
                      setIsOpen(false)
                    }}
                    className={[
                      'theme-option min-h-[104px] rounded-xl border p-2.5 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none',
                      isActive
                        ? 'border-[var(--border-accent)] bg-cyan-400/5'
                        : 'border-white/10 bg-white/2 hover:border-white/20',
                    ].join(' ')}
                  >
                    <span
                      data-theme={item.id}
                      className="appearance-preview relative mb-2 flex h-8 items-center overflow-hidden rounded-lg border border-white/10 px-2"
                    >
                      <span className="h-1.5 w-8 rounded-full bg-[var(--accent)] opacity-90" />
                      <span className="ml-1.5 h-1.5 w-4 rounded-full bg-[var(--accent-secondary)] opacity-65" />
                      {isActive ? (
                        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)]">
                          <Check size={10} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                      ) : null}
                    </span>
                    <span className="block text-[11px] font-semibold leading-4 text-white">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-4 text-slate-400">
                      {item.description}
                    </span>
                  </button>
                )
              })}
            </div>

            <fieldset className="mt-5 border-t border-[var(--border)] pt-4">
              <legend className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Visual Mode
              </legend>
              <div className="grid grid-cols-3 gap-1.5">
                {visualModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={visualMode === mode.id}
                    aria-label={`${mode.name}: ${mode.description}`}
                    title={mode.description}
                    onClick={() => setVisualMode(mode.id)}
                    className="visual-mode-option min-h-10 rounded-full border px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </fieldset>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default AppearanceSelector
