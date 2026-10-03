import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import AppearanceSelector from './AppearanceSelector'
import { navItems } from '../data/portfolioData'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: [0.35, 0.6, 0.8] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={`relative mx-auto mt-4 max-w-6xl px-4 transition-all duration-300 ${
          `theme-navbar ${scrolled ? 'rounded-full border border-white/10 bg-slate-950/80 shadow-[var(--shadow)] backdrop-blur-xl' : 'bg-transparent'}`
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <a href="#home" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-white md:text-base">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[var(--glow)]" />
            SHIVARAJ PM
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 md:flex">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = activeSection === id

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`theme-nav-link relative rounded-full px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  } ${isActive ? 'theme-nav-link-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="active-pill"
                      className="theme-nav-active absolute inset-0 z-0 rounded-full bg-white/8"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 35 }
                      }
                    />
                  ) : null}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <AppearanceSelector />
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="theme-surface overflow-hidden border-t border-white/10 bg-slate-950/85 md:hidden"
            >
              <div className="flex flex-col gap-2 px-4 py-4">
                {navItems.map((item) => {
                  const id = item.href.replace('#', '')
                  const isActive = activeSection === id

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                        isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-white/5'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar
