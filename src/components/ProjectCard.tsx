import type { MouseEvent } from 'react'
import type { Project } from '../data/projects'
import { CVCard } from './CVCard'
import { ExternalIcon } from './Icons'

type ProjectCardProps = {
  project: Project
  interactive: boolean
  priority?: boolean
  onOpenDetails: (project: Project, trigger: HTMLElement) => void
}

export function ProjectCard({ project, interactive, priority = false, onOpenDetails }: ProjectCardProps) {
  if (project.id === 'cv') return <CVCard interactive={interactive} />

  function openDetails(event: MouseEvent<HTMLButtonElement>) {
    onOpenDetails(project, event.currentTarget)
  }

  return (
    <>
      <div className={`media-frame media-${project.imageTheme}`}>
        <img
          className="project-image"
          src={project.image}
          alt={project.imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
        />
      </div>
      <div className="slide-info">
        <div className="slide-heading">
          <h2>{project.title}</h2>
          <p>{project.category}</p>
        </div>
        <div className="slide-actions">
          {project.primary.kind === 'external' ? (
            <a className="primary-action" href={project.primary.url} target="_blank" rel="noopener noreferrer" tabIndex={interactive ? 0 : -1}>
              {project.primary.label} <ExternalIcon />
            </a>
          ) : (
            <button className="secondary-action project-about-action" type="button" onClick={openDetails} tabIndex={interactive ? 0 : -1}>
              {project.primary.label}
            </button>
          )}
          {project.primary.kind === 'external' && project.details && (
            <button className="secondary-action project-about-action" type="button" onClick={openDetails} tabIndex={interactive ? 0 : -1}>
              Sobre el proyecto
            </button>
          )}
          {project.repository && (
            <a className="secondary-action" href={project.repository} target="_blank" rel="noopener noreferrer" tabIndex={interactive ? 0 : -1}>GitHub</a>
          )}
          {project.secondary && (
            <a className="secondary-action" href={project.secondary.url} target="_blank" rel="noopener noreferrer" tabIndex={interactive ? 0 : -1}>{project.secondary.label}</a>
          )}
        </div>
      </div>
    </>
  )
}
