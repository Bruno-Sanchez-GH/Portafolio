import { useEffect, useState } from 'react'

const sessionKey = 'bruno-portfolio-intro-seen'
const introDuration = 760

function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  try {
    return window.sessionStorage.getItem(sessionKey) !== '1'
  } catch {
    return false
  }
}

export function IntroReveal() {
  const [visible, setVisible] = useState(shouldShowIntro)

  useEffect(() => {
    if (!visible) return

    try {
      window.sessionStorage.setItem(sessionKey, '1')
    } catch {
      setVisible(false)
      return
    }

    const timeout = window.setTimeout(() => setVisible(false), introDuration + 100)
    return () => window.clearTimeout(timeout)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="intro-reveal"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setVisible(false)
      }}
    >
      <span className="intro-reveal-panel intro-reveal-panel-top" />
      <span className="intro-reveal-panel intro-reveal-panel-bottom" />
      <span className="intro-reveal-line" />
    </div>
  )
}
