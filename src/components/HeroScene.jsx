import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
const HeroScene = () => {
  const sceneRef = useRef(null)
  const reduceMotion = useReducedMotion() ?? false
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const parallaxX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.45 })
  const parallaxY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.45 })
  const parallaxRotateX = useSpring(rotateX, { stiffness: 90, damping: 22, mass: 0.45 })
  const parallaxRotateY = useSpring(rotateY, { stiffness: 90, damping: 22, mass: 0.45 })

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const updateMobile = (event) => setIsMobile(event.matches)
    mobileQuery.addEventListener('change', updateMobile)
    return () => mobileQuery.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    const hero = sceneRef.current?.closest('#home')
    if (!hero || reduceMotion || isMobile) return

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5
      const boundedX = Math.max(-1, Math.min(1, normalizedX))
      const boundedY = Math.max(-1, Math.min(1, normalizedY))
      pointerX.set(boundedX * -5)
      pointerY.set(boundedY * -5)
      rotateX.set(boundedY * -3)
      rotateY.set(boundedX * 3)
    }

    const resetParallax = () => {
      pointerX.set(0)
      pointerY.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }

    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', resetParallax)
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetParallax)
    }
  }, [pointerX, pointerY, reduceMotion, isMobile, rotateX, rotateY])

  return (
    <motion.div
      ref={sceneRef}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeOut', delay: 0.15 }}
      className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center sm:h-[480px] lg:h-[520px]"
    >
      <motion.div
        aria-hidden="true"
        animate={reduceMotion || isMobile ? { opacity: 0.2 } : { opacity: [0.16, 0.28, 0.16] }}
        transition={reduceMotion || isMobile ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="theme-profile-glow pointer-events-none absolute h-[340px] w-[340px] rounded-full blur-3xl sm:h-[400px] sm:w-[400px]"
      />
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          rotateX: parallaxRotateX,
          rotateY: parallaxRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 flex w-full flex-col items-center"
      >
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="portrait-composition flex flex-col items-center"
        >
          <motion.div className="theme-profile-frame group relative h-[min(78vw,360px)] w-[min(78vw,360px)] max-h-full max-w-full rounded-full p-[7px] shadow-[var(--shadow)] sm:p-[9px]">
            <span className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
            <span className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
            <span className="portrait-orbit portrait-orbit-three" aria-hidden="true" />
            <span className="portrait-orbit-path portrait-orbit-path-one" aria-hidden="true">
              <span />
            </span>
            <span className="portrait-orbit-path portrait-orbit-path-two" aria-hidden="true">
              <span />
            </span>
            <span className="portrait-orbit-path portrait-orbit-path-three" aria-hidden="true">
              <span />
            </span>
            <div className="theme-profile-surface relative h-full w-full overflow-hidden rounded-full border border-white/35 bg-slate-950 p-[5px] sm:p-[7px]">
              <motion.img
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.75, ease: 'easeOut', delay: 0.25 }}
                src="/assets/profile.jpg"
                alt="Shivaraj PM"
                className="h-full w-full rounded-full object-cover object-[center_24%]"
              />
            </div>

            <svg
              className="portrait-ring-draw pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              fill="none"
              aria-hidden="true"
            >
              <motion.circle
                cx="200"
                cy="200"
                r="197"
                pathLength="1"
                stroke="var(--portrait-gold)"
                strokeWidth="1.5"
                initial={reduceMotion ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: 'easeInOut', delay: 0.35 }}
              />
            </svg>

            <svg
              className="portrait-ring-sweep pointer-events-none absolute -inset-[9px] h-[calc(100%+18px)] w-[calc(100%+18px)]"
              viewBox="0 0 420 420"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="210"
                cy="210"
                r="207"
                pathLength="100"
                stroke="var(--portrait-gold)"
                strokeDasharray="12 88"
                strokeLinecap="round"
                strokeWidth="1"
                opacity="0.75"
              />
            </svg>

            <span className="portrait-dot portrait-dot-one" aria-hidden="true" />
            <span className="portrait-dot portrait-dot-two" aria-hidden="true" />
            <span className="portrait-dot portrait-dot-three" aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: 'easeOut', delay: 0.72 }}
            className="portrait-signature-wrap mt-5 text-center"
          >
            <p className="portrait-signature">SHIVARAJ PM</p>
            <motion.span
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut', delay: 1 }}
              className="portrait-signature-underline"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default HeroScene
