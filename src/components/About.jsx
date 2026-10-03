import { motion } from 'framer-motion'
import { aboutHighlights } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const About = () => {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading eyebrow="ABOUT ME" title="Engineer. Developer. Builder." subtitle="I am an Electronics and Communication Engineering student with a strong interest in software development, artificial intelligence, embedded systems, and modern technologies. I enjoy building practical projects that combine hardware, software, and intelligent systems." />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {aboutHighlights.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="theme-card group rounded-3xl border border-white/10 bg-white/4 p-6 shadow-[var(--shadow)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[var(--glow)]"
          >
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.30em] text-cyan-300/80">
              0{index + 1}
            </p>
            <h3 className="text-lg font-semibold uppercase tracking-[0.12em] text-white">
              {item}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default About
