import { useEffect, useRef } from 'react'
import type { ShowcaseProject } from '../data/projects'
import { CloseIcon, ExternalIcon } from './Icons'

type ProjectModalProps = {
  project: ShowcaseProject
  trigger: HTMLElement
  onClose: () => void
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function ProjectModal({ project, trigger, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    function focusables() {
      return Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])
        .filter((element) => element.getAttribute('aria-hidden') !== 'true')
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const available = focusables()
      if (!available.length) return
      const first = available[0]
      const last = available[available.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    function containFocus(event: FocusEvent) {
      if (dialogRef.current?.contains(event.target as Node)) return
      closeRef.current?.focus({ preventScroll: true })
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', containFocus)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', containFocus)
      window.requestAnimationFrame(() => {
        if (document.contains(trigger)) trigger.focus({ preventScroll: true })
      })
    }
  }, [onClose, trigger])

  const titleId = `project-modal-title-${project.id}`
  const descriptionId = `project-modal-description-${project.id}`

  return (
    <div className="dialog-backdrop project-modal-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        ref={dialogRef}
      >
        <div className="detail-topline">
          <span>Sobre el proyecto</span>
          <button className="close-button" type="button" ref={closeRef} onClick={onClose} aria-label={`Cerrar información de ${project.title}`}>
            <CloseIcon />
          </button>
        </div>

        {project.details ? (
          <div className="project-modal-content">
            <p className="detail-category">{project.category}</p>
            <h2 id={titleId}>{project.title}</h2>

            <section className="project-modal-section" aria-labelledby={`${titleId}-summary`}>
              <h3 id={`${titleId}-summary`}>En qué consiste</h3>
              <p id={descriptionId}>{project.details.summary}</p>
            </section>

            <section className="project-modal-section" aria-labelledby={`${titleId}-features`}>
              <h3 id={`${titleId}-features`}>Qué permite hacer</h3>
              <ul>
                {project.details.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
          </div>
        ) : (
          <div className="project-modal-content">
            <div className={`project-modal-media media-${project.imageTheme}`}>
              <img src={project.image} alt={project.imageAlt} />
            </div>
            <p className="detail-category">{project.category}</p>
            <h2 id={titleId}>{project.title}</h2>
            <p className="project-modal-description" id={descriptionId}>{project.description}</p>
          </div>
        )}

        <div className="project-modal-links" aria-label={`Enlaces de ${project.title}`}>
          {project.primary.kind === 'external' && (
            <a href={project.primary.url} target="_blank" rel="noopener noreferrer">
              {project.primary.label === 'Ver proyecto' ? 'Visitar proyecto' : project.primary.label} <ExternalIcon />
            </a>
          )}
          {project.repository && (
            <a href={project.repository} target="_blank" rel="noopener noreferrer">GitHub <ExternalIcon /></a>
          )}
          {project.secondary && (
            <a href={project.secondary.url} target="_blank" rel="noopener noreferrer">{project.secondary.label} <ExternalIcon /></a>
          )}
        </div>
      </div>
    </div>
  )
}
