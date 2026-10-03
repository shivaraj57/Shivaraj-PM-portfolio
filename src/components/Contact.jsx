import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { contactMeta } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

const initialFormState = {
  name: '',
  email: '',
  message: '',
}

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.name.trim()) {
      return 'Please enter your name.'
    }
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      return 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      return 'Please enter a message.'
    }

    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = validateForm()

    if (validationError) {
      setStatus({ type: 'error', message: validationError })
      return
    }

    setStatus({ type: 'idle', message: '' })
    const subject = `Portfolio Contact — ${formData.name.trim()}`
    const body = `Name: ${formData.name.trim()}\n\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    const mailto = `mailto:${contactMeta.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setStatus({
      type: 'success',
      message: 'Your email client should open with the message ready. Send it from your email app.',
    })
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading eyebrow="GET IN TOUCH" title="Have a project or opportunity?" subtitle="Have a project, opportunity, or idea? Let's connect." />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="theme-card rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white">Let&apos;s talk</h3>

          <div className="mt-6 space-y-4 text-slate-300">
            <a
              href={`mailto:${contactMeta.email}`}
              aria-label="Email Shivaraj PM"
              className="flex min-h-11 items-center gap-3 text-sm transition-colors hover:text-[var(--accent)]"
            >
              <span className="theme-surface inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-cyan-300"><Mail size={16} /></span>
              {contactMeta.email}
            </a>
            <a href={`tel:${contactMeta.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm hover:text-cyan-200">
              <span className="theme-surface inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-cyan-300"><Phone size={16} /></span>
              {contactMeta.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="theme-surface inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-cyan-300"><MapPin size={16} /></span>
              Mysuru, Karnataka, India
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="theme-card rounded-[28px] border border-white/10 bg-slate-950/50 p-6 shadow-[var(--shadow)]"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="theme-input w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="theme-input w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
                placeholder="your@email.com"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Message</span>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="theme-input w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
              placeholder="Tell me about your idea..."
            />
          </label>

          {status.message ? (
            <div
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live={status.type === 'error' ? 'assertive' : 'polite'}
              className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                status.type === 'error'
                  ? 'border-red-400/40 bg-red-500/10 text-red-200'
                  : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <button
            type="submit"
            className="theme-primary-button mt-6 inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
