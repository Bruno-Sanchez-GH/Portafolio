import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { ArrowIcon } from './Icons'

type CarouselNavigationProps = {
  projects: readonly Project[]
  activeIndex: number
  reducedMotion: boolean
  onPrevious: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

export function CarouselNavigation({ projects, activeIndex, reducedMotion, onPrevious, onNext, onSelect }: CarouselNavigationProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const scroller = scrollerRef.current
    const button = buttonRefs.current[activeIndex]
    if (!scroller || !button) return
    const left = button.offsetLeft - scroller.offsetLeft - (scroller.clientWidth - button.clientWidth) / 2
    scroller.scrollTo({ left, behavior: reducedMotion ? 'instant' : 'smooth' })
  }, [activeIndex, reducedMotion])

  return (
    <nav className="carousel-navigation" aria-label="Proyectos del carrusel">
      <button className="nav-arrow nav-previous" type="button" onClick={onPrevious} aria-label="Proyecto anterior">
        <ArrowIcon />
      </button>
      <span className="mobile-counter" aria-hidden="true">{activeIndex + 1} / {projects.length}</span>
      <div className="project-tabs" ref={scrollerRef}>
        {projects.map((project, index) => (
          <button
            className={`project-tab${activeIndex === index ? ' is-active' : ''}`}
            type="button"
            key={project.id}
            ref={(node) => { buttonRefs.current[index] = node }}
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? 'true' : undefined}
          >{project.title}</button>
        ))}
      </div>
      <button className="nav-arrow nav-next" type="button" onClick={onNext} aria-label="Proyecto siguiente">
        <ArrowIcon />
      </button>
    </nav>
  )
}
