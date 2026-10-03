import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const trailSizes = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const trailLifetime = 340
const burstDirections = [
  [0, -13],
  [12, -4],
  [8, 10],
  [-8, 10],
  [-12, -4],
  [0, 7],
]

const setPosition = (element, x, y) => {
  element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
}

const CustomCursor = () => {
  const pointRef = useRef(null)
  const haloRef = useRef(null)
  const streakRef = useRef(null)
  const trailRefs = useRef([])
  const pulseRef = useRef(null)
  const burstRefs = useRef([])

  useEffect(() => {
    const point = pointRef.current
    const halo = haloRef.current
    const streak = streakRef.current
    const trail = trailRefs.current
    const pulse = pulseRef.current
    const burst = burstRefs.current
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let history = []
    let totalDistance = 0
    let smoothedSpeed = 0
    let direction = { x: 1, y: 0 }
    let lastMoveAt = 0
    let previousMove = null
    let animationFrame = 0
    let burstAnimations = []
    let pulseAnimation

    if (
      !point ||
      !halo ||
      !streak ||
      !pulse ||
      trail.length !== trailSizes.length ||
      burst.length !== burstDirections.length
    ) {
      return undefined
    }

    const isTextEntry = (target) =>
      target instanceof Element &&
      Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))

    const hideCursor = () => {
      document.documentElement.classList.remove('comet-cursor-active')
      document.body.dataset.cometHover = 'false'
    }

    const findHistoryPosition = (distanceBehind) => {
      const targetDistance = totalDistance - distanceBehind
      if (targetDistance <= history[0]?.distance) return history[0]
      for (let index = history.length - 1; index > 0; index -= 1) {
        const newer = history[index]
        const older = history[index - 1]
        if (older.distance <= targetDistance) {
          const span = newer.distance - older.distance
          const progress = span > 0 ? (targetDistance - older.distance) / span : 0
          return {
            x: older.x + (newer.x - older.x) * progress,
            y: older.y + (newer.y - older.y) * progress,
            time: newer.time,
          }
        }
      }
      return history[history.length - 1]
    }

    const clearTrail = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      trail.forEach((particle) => {
        if (!particle) return
        particle.style.opacity = '0'
        particle.style.visibility = 'hidden'
      })
      streak.style.opacity = '0'
      history = []
      totalDistance = 0
      smoothedSpeed = 0
      previousMove = null
      animationFrame = 0
    }

    const animateTrail = (now) => {
      const interactive = document.body.dataset.cometHover === 'true'
      const fade = Math.max(0, 1 - (now - lastMoveAt) / trailLifetime)
      const trailLength = Math.min(110, 70 + smoothedSpeed * 24) * fade

      trail.forEach((particle, index) => {
        if (!particle) return
        const distanceBehind = trailLength * ((index + 1) / trail.length)
        const position =
          fade > 0.015 && totalDistance >= distanceBehind
            ? findHistoryPosition(distanceBehind)
            : null
        if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.y)) {
          particle.style.opacity = '0'
          particle.style.visibility = 'hidden'
          return
        }

        const strength = index < 3 ? 0.74 - index * 0.09 : 0.48 - (index - 3) * 0.045
        particle.style.visibility = fade > 0.015 ? 'visible' : 'hidden'
        particle.style.opacity = String(fade * strength * (interactive ? 1.2 : 1))
        particle.style.filter = `blur(${Math.min(1.2, index * 0.14)}px)`
        setPosition(particle, position.x, position.y)
      })

      streak.style.width = `${Math.min(60, 30 + smoothedSpeed * 24)}px`
      streak.style.opacity = String(fade * Math.min(0.72, 0.22 + smoothedSpeed * 0.32))
      streak.style.transform = `translate3d(${pointX}px, ${pointY}px, 0) translate(-100%, -50%) rotate(${Math.atan2(direction.y, direction.x)}rad)`

      if (now - lastMoveAt < trailLifetime) {
        animationFrame = window.requestAnimationFrame(animateTrail)
      } else {
        clearTrail()
      }
    }

    let pointX = 0
    let pointY = 0

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return

      if (isTextEntry(event.target)) {
        hideCursor()
        clearTrail()
        return
      }

      const x = event.clientX
      const y = event.clientY
      const now = performance.now()
      pointX = x
      pointY = y
      point.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      setPosition(halo, x, y)
      document.documentElement.classList.add('comet-cursor-active')

      const isInteractive =
        event.target instanceof Element &&
        Boolean(
          event.target.closest(
            'a[href], button:not(:disabled), [role="button"], [role="link"], summary, input[type="button"], input[type="submit"], .project-glass-card, [data-cursor-hover]',
          ),
        )
      document.body.dataset.cometHover = String(isInteractive)

      if (document.documentElement.dataset.visualMode === 'performance') {
        clearTrail()
        return
      }

      const dx = previousMove ? x - previousMove.x : 0
      const dy = previousMove ? y - previousMove.y : 0
      const distance = Math.hypot(dx, dy)
      const elapsed = previousMove ? Math.max(1, now - previousMove.time) : 16
      const instantaneousSpeed = distance / elapsed
      smoothedSpeed = smoothedSpeed * 0.55 + instantaneousSpeed * 0.45
      if (distance >= 0.7) {
        direction = { x: dx / distance, y: dy / distance }
        totalDistance += distance
        history.push({ x, y, time: now, distance: totalDistance })
        if (history.length > 48) history.shift()
      }
      previousMove = { x, y, time: now }
      lastMoveAt = now

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateTrail)
      }
    }

    const handlePointerLeave = () => {
      hideCursor()
      clearTrail()
    }

    const handleClick = (event) => {
      if (
        event.detail === 0 ||
        isTextEntry(event.target) ||
        document.documentElement.dataset.visualMode === 'performance'
      ) {
        return
      }

      burstAnimations.forEach((animation) => animation.cancel())
      pulseAnimation?.cancel()
      const pulseStart = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(0.5)`
      const pulseEnd = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(2)`
      pulse.style.visibility = 'visible'
      pulseAnimation = pulse.animate(
        [
          { transform: pulseStart, opacity: 0.82 },
          { transform: pulseEnd, opacity: 0 },
        ],
        { duration: 400, easing: 'ease-out', fill: 'forwards' },
      )
      pulseAnimation.onfinish = () => {
        pulse.style.opacity = '0'
        pulse.style.visibility = 'hidden'
        pulseAnimation.cancel()
      }
      burstAnimations = burst.map((particle, index) => {
        const [offsetX, offsetY] = burstDirections[index]
        particle.style.visibility = 'visible'
        const start = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(1)`
        const end = `translate3d(${event.clientX + offsetX}px, ${event.clientY + offsetY}px, 0) translate(-50%, -50%) scale(0.4)`
        const animation = particle.animate(
          [
            { transform: start, opacity: 0.95 },
            { transform: end, opacity: 0 },
          ],
          { duration: 400, easing: 'ease-out', fill: 'forwards' },
        )
        animation.onfinish = () => {
          particle.style.opacity = '0'
          particle.style.visibility = 'hidden'
          animation.cancel()
        }
        return animation
      })
    }

    const deactivate = () => {
      document.documentElement.classList.remove('comet-cursor-enabled', 'comet-cursor-active')
      delete document.body.dataset.cometHover
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('click', handleClick)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      history = []
      trail.forEach((particle) => {
        if (!particle) return
        particle.style.opacity = '0'
        particle.style.visibility = 'hidden'
      })
      burstAnimations.forEach((animation) => animation.cancel())
      burstAnimations = []
      pulseAnimation?.cancel()
      pulseAnimation = undefined
      pulse.style.opacity = '0'
      pulse.style.visibility = 'hidden'
      burst.forEach((particle) => {
        if (!particle) return
        particle.style.opacity = '0'
        particle.style.visibility = 'hidden'
      })
    }

    const updateSupport = () => {
      deactivate()
      if (
        finePointerQuery.matches &&
        !reducedMotionQuery.matches &&
        window.innerWidth >= 768 &&
        !(navigator.maxTouchPoints > 0)
      ) {
        document.documentElement.classList.add('comet-cursor-enabled')
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)
        window.addEventListener('click', handleClick)
      }
    }

    updateSupport()
    finePointerQuery.addEventListener('change', updateSupport)
    reducedMotionQuery.addEventListener('change', updateSupport)
    window.addEventListener('resize', updateSupport)

    return () => {
      finePointerQuery.removeEventListener('change', updateSupport)
      reducedMotionQuery.removeEventListener('change', updateSupport)
      window.removeEventListener('resize', updateSupport)
      deactivate()
    }
  }, [])

  return createPortal(
    <>
      <span ref={pointRef} className="comet-cursor-point" aria-hidden="true">
        <span className="comet-cursor-point-visual" />
      </span>
      <span ref={haloRef} className="comet-cursor-halo" aria-hidden="true">
        <span className="comet-cursor-halo-visual" />
      </span>
      <span ref={streakRef} className="comet-cursor-streak" aria-hidden="true" />
      {trailSizes.map((size, index) => (
        <span
          key={size}
          ref={(element) => {
            trailRefs.current[index] = element
          }}
          className={`comet-cursor-trail comet-cursor-trail-${index + 1}`}
          aria-hidden="true"
        />
      ))}
      <span ref={pulseRef} className="comet-cursor-pulse" aria-hidden="true" />
      {burstDirections.map((_, index) => (
        <span
          key={`burst-${index}`}
          ref={(element) => {
            burstRefs.current[index] = element
          }}
          className="comet-cursor-burst"
          aria-hidden="true"
        />
      ))}
    </>,
    document.body,
  )
}

export default CustomCursor
