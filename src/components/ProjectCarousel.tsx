import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent, TransitionEvent } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { CarouselNavigation } from './CarouselNavigation'
import { ProjectCard } from './ProjectCard'

type Direction = -1 | 1
type Move = { to: number; direction: Direction }
type Motion = Move & { from: number; started: boolean }

type ProjectCarouselProps = {
  onOpenDetails: (project: Project, trigger: HTMLElement) => void
  shortcutsDisabled?: boolean
}

export function ProjectCarousel({ onOpenDetails, shortcutsDisabled = false }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [motion, setMotion] = useState<Motion | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const indexRef = useRef(0)
  const motionRef = useRef<Motion | null>(null)
  const busyRef = useRef(false)
  const queueRef = useRef<Move[]>([])
  const timeoutRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const suppressClickRef = useRef(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const preload = (source: string) => { const image = new Image(); image.src = source }
    preload(projects[(activeIndex + 1) % projects.length].image)
    preload(projects[(activeIndex - 1 + projects.length) % projects.length].image)
  }, [activeIndex])

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
  }, [])

  function finishMove() {
    const current = motionRef.current
    if (!current) return
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    motionRef.current = null
    indexRef.current = current.to
    setActiveIndex(current.to)
    setMotion(null)
    timeoutRef.current = window.setTimeout(() => {
      const next = queueRef.current.shift()
      if (next) beginMove(next)
      else busyRef.current = false
    }, 35)
  }

  function beginMove(move: Move) {
    if (move.to === indexRef.current) {
      const next = queueRef.current.shift()
      if (next) beginMove(next)
      else busyRef.current = false
      return
    }
    if (reducedMotion) {
      indexRef.current = move.to
      setActiveIndex(move.to)
      const next = queueRef.current.shift()
      if (next) beginMove(next)
      else busyRef.current = false
      return
    }
    busyRef.current = true
    const initial: Motion = { from: indexRef.current, ...move, started: false }
    motionRef.current = initial
    setMotion(initial)
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = window.requestAnimationFrame(() => {
        setMotion((current) => current ? { ...current, started: true } : null)
      })
    })
    timeoutRef.current = window.setTimeout(finishMove, 560)
  }

  function enqueue(move: Move, replaceQueue = false) {
    if (replaceQueue) queueRef.current = []
    if (busyRef.current) {
      queueRef.current.push(move)
      return
    }
    beginMove(move)
  }

  function plannedIndex() {
    const queue = queueRef.current
    return queue.length ? queue[queue.length - 1].to : motionRef.current?.to ?? indexRef.current
  }

  function step(direction: Direction) {
    const to = (plannedIndex() + direction + projects.length) % projects.length
    enqueue({ to, direction })
  }

  function select(to: number) {
    const from = motionRef.current?.to ?? indexRef.current
    if (to === from && queueRef.current.length === 0) return
    enqueue({ to, direction: to > from ? 1 : -1 }, true)
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (shortcutsDisabled) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    touchRef.current = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchRef.current) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchRef.current.x
    const deltaY = touch.clientY - touchRef.current.y
    touchRef.current = null
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return
    suppressClickRef.current = true
    window.setTimeout(() => { suppressClickRef.current = false }, 350)
    step(deltaX < 0 ? 1 : -1)
  }

  function onSlideTransitionEnd(event: TransitionEvent<HTMLElement>) {
    if (event.target === event.currentTarget && event.propertyName === 'transform') finishMove()
  }

  const shownIndex = motion?.to ?? activeIndex
  const displayedSlides = motion ? [motion.from, motion.to] : [activeIndex]

  return (
    <section className="carousel-section" aria-label="Proyectos y experiencia">
      <div className="carousel-root" role="region" aria-roledescription="carrusel" aria-label="Proyectos y experiencia de Bruno Sánchez" tabIndex={0} onKeyDown={onKeyDown}>
        <div
          className="carousel-stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => { touchRef.current = null }}
          onClickCapture={(event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation() } }}
        >
          {displayedSlides.map((index) => {
            const project = projects[index]
            const outgoing = motion?.from === index
            const translate = motion
              ? outgoing ? (motion.started ? -motion.direction * 100 : 0) : (motion.started ? 0 : motion.direction * 100)
              : 0
            const interactive = !motion && index === activeIndex
            return (
              <article
                className={`carousel-slide${motion?.started ? ' is-moving' : ''}`}
                key={project.id}
                style={{ transform: `translate3d(${translate}%, 0, 0)` }}
                aria-hidden={!interactive}
                inert={!interactive}
                onTransitionEnd={onSlideTransitionEnd}
              >
                <ProjectCard project={project} interactive={interactive} priority={index === 0 && !motion} onOpenDetails={onOpenDetails} />
              </article>
            )
          })}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{`Proyecto ${activeIndex + 1} de ${projects.length}: ${projects[activeIndex].title}`}</p>
        <CarouselNavigation
          projects={projects}
          activeIndex={shownIndex}
          reducedMotion={reducedMotion}
          onPrevious={() => step(-1)}
          onNext={() => step(1)}
          onSelect={select}
        />
      </div>
    </section>
  )
}
