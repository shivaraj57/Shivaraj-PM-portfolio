import { useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const progressRef = useRef(null)

  useEffect(() => {
    const element = progressRef.current
    if (!element) return undefined

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      element.style.setProperty('--scroll-progress', String(Math.max(0, Math.min(1, progress))))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div ref={progressRef} className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress-fill" />
      <span className="scroll-progress-marker" />
    </div>
  )
}

export default ScrollProgress
