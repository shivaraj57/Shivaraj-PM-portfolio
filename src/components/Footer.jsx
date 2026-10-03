import { motion, useReducedMotion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { footerLinks } from '../data/portfolioData'

const Footer = () => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.footer
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' }}
      className="theme-footer border-t border-white/10 bg-slate-950/70"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xl font-black tracking-[0.18em] text-white">SHIVARAJ PM</p>
          <p className="mt-2 text-sm text-slate-300">ECE Engineer &amp; Software Developer</p>
          <p className="footer-signature mt-4">Designed &amp; Built by Shivaraj PM</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-cyan-200">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="mailto:shivarajpm57@gmail.com" aria-label="Email Shivaraj PM" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--border-accent)] hover:text-[var(--accent)]">
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
        © 2026 Shivaraj PM. All rights reserved. <span className="mx-2 text-slate-600">|</span> Built with React
      </div>
    </motion.footer>
  )
}

export default Footer
