import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, Camera, GitBranch, Mail, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { heroSocials } from '../data/portfolioData'
import HeroScene from './HeroScene'

const profileName = 'Shivaraj PM'

const socialIconMap = {
  instagram: Camera,
  facebook: UsersRound,
  linkedin: BriefcaseBusiness,
  github: GitBranch,
}

const Hero = () => {
  const reduceMotion = useReducedMotion() ?? false
  const [nameLength, setNameLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined

    let timeout
    if (!isDeleting && nameLength < profileName.length) {
      timeout = window.setTimeout(() => setNameLength((length) => length + 1), 120)
    } else if (!isDeleting) {
      timeout = window.setTimeout(() => setIsDeleting(true), 1750)
    } else if (nameLength > 0) {
      timeout = window.setTimeout(() => setNameLength((length) => length - 1), 75)
    } else {
      timeout = window.setTimeout(() => setIsDeleting(false), 450)
    }

    return () => window.clearTimeout(timeout)
  }, [isDeleting, nameLength, reduceMotion])

  const displayedName = profileName.slice(0, nameLength)

  return (
    <section id="home" className="hero-premium relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <span className="hero-decoration hero-decoration-ring" aria-hidden="true" />
      <span className="hero-decoration hero-decoration-orb" aria-hidden="true" />
      <div className="hero-grid grid w-full items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hero-copy max-w-2xl"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80">
            HELLO, I&apos;M
          </p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-black leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl"
          >
            <span className="sr-only">{profileName}</span>
            <span className="hero-typing-name" aria-hidden="true">
              <span className="hero-typing-reserved" aria-hidden="true">{profileName}</span>
              <span className="hero-typing-visual" aria-hidden="true">
                {reduceMotion ? profileName : displayedName}
                {!reduceMotion && <span className="hero-typing-cursor" />}
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-role mt-4 text-xl font-semibold uppercase tracking-[0.12em] text-slate-200 sm:text-2xl lg:text-3xl"
          >
            <span className="block text-cyan-300">ECE ENGINEER</span>
            <span className="block text-slate-100">&amp; SOFTWARE DEVELOPER</span>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-description mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg"
          >
            I build intelligent software applications, embedded systems, and interactive digital experiences by combining electronics, programming, and problem-solving.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-cta-row mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#projects"
              className="theme-primary-button hero-cta-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-contrast)] shadow-[var(--glow)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
            >
              View My Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="mailto:shivarajpm57@gmail.com"
              className="theme-secondary-button hero-cta-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5"
              aria-label="Email Shivaraj PM"
            >
              Contact Me
              <Mail size={16} />
            </a>
          </motion.div>

          <motion.div
            className="hero-social-row mt-7 flex flex-wrap items-center gap-3"
          >
            {heroSocials.map((social, index) => {
              const Icon = socialIconMap[social.icon]

              return (
                <motion.div
                  key={social.label}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.4 + index * 0.1, ease: 'easeOut' }}
                  className="flex min-w-[52px] flex-col items-center"
                >
                  <motion.a
                    href={social.href}
                    aria-label={`Shivaraj PM on ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? undefined : { y: -2, scale: 1.08 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className="hero-social-link group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-12 sm:w-12"
                  >
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className="hero-social-tooltip" aria-hidden="true">{social.label}</span>
                  </motion.a>
                  <span className="hero-social-label mt-1.5 text-[10px] font-medium">{social.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hero-profile-column relative mx-auto flex w-full max-w-[540px] items-center justify-center"
        >
          <div className="hero-profile-panel relative flex w-full items-center justify-center overflow-visible rounded-[30px] border p-2 sm:p-3">
            <span className="hero-profile-halo" aria-hidden="true" />
            <span className="hero-profile-detail hero-profile-detail-one" aria-hidden="true" />
            <span className="hero-profile-detail hero-profile-detail-two" aria-hidden="true" />
          <HeroScene />
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span>SCROLL</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}

export default Hero
