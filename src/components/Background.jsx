import { useEffect, useRef } from 'react'

const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${-(index * 1.1)}s`,
  duration: `${12 + (index % 5) * 1.8}s`,
}))

const Background = () => {
  const backgroundRef = useRef(null)

  useEffect(() => {
    const background = backgroundRef.current
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const glassSelector =
      '.theme-card, .theme-navbar, .theme-panel, .hero-profile-panel, .theme-primary-button, .theme-secondary-button, .hero-social-link'
    let activeSurface = null
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    if (!background) return undefined

    const clearSurface = () => {
      if (!activeSurface) return
      activeSurface.dataset.glassActive = 'false'
      activeSurface.style.removeProperty('--mouse-x')
      activeSurface.style.removeProperty('--mouse-y')
      activeSurface = null
    }

    const stopBackgroundInteraction = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      targetX = 0
      targetY = 0
      currentX = 0
      currentY = 0
      background.style.setProperty('--liquid-shift-x', '0px')
      background.style.setProperty('--liquid-shift-y', '0px')
      clearSurface()
    }

    const animateBackground = () => {
      currentX += (targetX - currentX) * 0.055
      currentY += (targetY - currentY) * 0.055
      background.style.setProperty('--liquid-shift-x', `${currentX.toFixed(2)}px`)
      background.style.setProperty('--liquid-shift-y', `${currentY.toFixed(2)}px`)

      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        frame = window.requestAnimationFrame(animateBackground)
      } else {
        currentX = targetX
        currentY = targetY
        background.style.setProperty('--liquid-shift-x', `${currentX.toFixed(2)}px`)
        background.style.setProperty('--liquid-shift-y', `${currentY.toFixed(2)}px`)
        frame = 0
      }
    }

    const handlePointerMove = (event) => {
      if (
        !finePointerQuery.matches ||
        reducedMotionQuery.matches ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768 ||
        document.documentElement.dataset.visualMode === 'performance'
      ) {
        stopBackgroundInteraction()
        return
      }

      const normalizedX = event.clientX / window.innerWidth - 0.5
      const normalizedY = event.clientY / window.innerHeight - 0.5
      targetX = normalizedX * -10
      targetY = normalizedY * -8
      if (!frame && (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08)) {
        frame = window.requestAnimationFrame(animateBackground)
      }

      const target = event.target instanceof Element ? event.target.closest(glassSelector) : null
      if (target !== activeSurface) {
        clearSurface()
        activeSurface = target
      }
      if (!activeSurface) return

      const bounds = activeSurface.getBoundingClientRect()
      const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
      const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100))
      activeSurface.style.setProperty('--mouse-x', `${x.toFixed(2)}%`)
      activeSurface.style.setProperty('--mouse-y', `${y.toFixed(2)}%`)
      activeSurface.dataset.glassActive = 'true'
    }

    const handlePointerOut = (event) => {
      if (!activeSurface || !(event.target instanceof Element)) return
      if (event.target.closest(glassSelector) !== activeSurface) return
      const nextSurface =
        event.relatedTarget instanceof Element ? event.relatedTarget.closest(glassSelector) : null
      if (nextSurface !== activeSurface) clearSurface()
    }

    const handleEnvironmentChange = () => {
      if (
        !finePointerQuery.matches ||
        reducedMotionQuery.matches ||
        window.innerWidth < 768 ||
        document.documentElement.dataset.visualMode === 'performance'
      ) {
        stopBackgroundInteraction()
      }
    }

    const handlePointerLeave = () => {
      targetX = 0
      targetY = 0
      clearSurface()
      if (!frame && (Math.abs(currentX) > 0.08 || Math.abs(currentY) > 0.08)) {
        frame = window.requestAnimationFrame(animateBackground)
      }
    }

    const modeObserver = new MutationObserver(handleEnvironmentChange)
    modeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-visual-mode'],
    })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerout', handlePointerOut)
    finePointerQuery.addEventListener('change', handleEnvironmentChange)
    reducedMotionQuery.addEventListener('change', handleEnvironmentChange)
    window.addEventListener('resize', handleEnvironmentChange)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerout', handlePointerOut)
      finePointerQuery.removeEventListener('change', handleEnvironmentChange)
      reducedMotionQuery.removeEventListener('change', handleEnvironmentChange)
      window.removeEventListener('resize', handleEnvironmentChange)
      modeObserver.disconnect()
      stopBackgroundInteraction()
    }
  }, [])

  return (
    <div
      ref={backgroundRef}
      className="background-interaction pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      <div className="liquid-atmosphere absolute inset-0" aria-hidden="true" />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="liquid-flow absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="liquid-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgb(var(--liquid-rgb))" stopOpacity="0.03" />
            <stop offset="0.45" stopColor="rgb(var(--accent-secondary-rgb))" stopOpacity="0.16" />
            <stop offset="1" stopColor="rgb(var(--liquid-rgb))" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="liquid-highlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(var(--liquid-rgb))" stopOpacity="0" />
            <stop offset="0.48" stopColor="rgb(var(--liquid-rgb))" stopOpacity="0.28" />
            <stop offset="1" stopColor="rgb(var(--liquid-rgb))" stopOpacity="0" />
          </linearGradient>
          <filter id="liquid-soft-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <g className="liquid-ribbon liquid-ribbon-one">
          <path
            d="M-110 455 C95 370 170 535 350 493 C545 447 536 275 730 287 C934 299 963 476 1124 481 C1270 486 1335 359 1555 350"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="58"
            filter="url(#liquid-soft-glow)"
          />
          <path
            d="M-110 455 C95 370 170 535 350 493 C545 447 536 275 730 287 C934 299 963 476 1124 481 C1270 486 1335 359 1555 350"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="30"
          />
          <path
            d="M-110 438 C95 352 170 517 350 475 C545 429 536 257 730 269 C934 281 963 458 1124 463 C1270 468 1335 341 1555 332"
            fill="none"
            stroke="url(#liquid-highlight)"
            strokeWidth="1.5"
          />
        </g>

        <g className="liquid-ribbon liquid-ribbon-two">
          <path
            d="M-125 760 C80 710 165 560 337 588 C514 617 591 788 760 746 C929 704 951 560 1110 561 C1278 563 1349 708 1562 645"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="50"
            filter="url(#liquid-soft-glow)"
          />
          <path
            d="M-125 760 C80 710 165 560 337 588 C514 617 591 788 760 746 C929 704 951 560 1110 561 C1278 563 1349 708 1562 645"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="24"
          />
          <path
            d="M-125 744 C80 694 165 544 337 572 C514 601 591 772 760 730 C929 688 951 544 1110 545 C1278 547 1349 692 1562 629"
            fill="none"
            stroke="url(#liquid-highlight)"
            strokeWidth="1.25"
          />
        </g>

        <g className="liquid-ribbon liquid-ribbon-three">
          <path
            d="M-90 186 C115 245 212 104 388 123 C565 142 627 299 803 259 C977 219 1032 77 1195 109 C1340 139 1389 242 1540 216"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="42"
            filter="url(#liquid-soft-glow)"
          />
          <path
            d="M-90 186 C115 245 212 104 388 123 C565 142 627 299 803 259 C977 219 1032 77 1195 109 C1340 139 1389 242 1540 216"
            fill="none"
            stroke="url(#liquid-gold)"
            strokeWidth="20"
          />
          <path
            d="M-90 171 C115 230 212 89 388 108 C565 127 627 284 803 244 C977 204 1032 62 1195 94 C1340 124 1389 227 1540 201"
            fill="none"
            stroke="url(#liquid-highlight)"
            strokeWidth="1"
          />
        </g>
      </svg>

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}

export default Background
