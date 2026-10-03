import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { resumeNote } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const Resume = () => {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="theme-card rounded-[32px] border border-[var(--border-accent)] bg-slate-950/70 p-8 shadow-[var(--shadow)] backdrop-blur-sm md:p-12"
      >
        <SectionHeading eyebrow="RESUME" title="Let's build something great" subtitle="Interested in my work or want to know more about my experience?" />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-contrast)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            <FileText size={16} />
            View Resume
          </a>
          <a
            href="/resume.pdf"
            download
            className="theme-secondary-button inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/4 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:border-cyan-400/60"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300">{resumeNote}</p>
      </motion.div>
    </section>
  )
}

export default Resume
