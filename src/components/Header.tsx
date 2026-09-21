import { links } from '../data/projects'
import { GitHubIcon } from './Icons'

type HeaderProps = {
  onOpenAbout: (trigger: HTMLElement) => void
  onOpenContact: (trigger: HTMLElement) => void
}

export function Header({ onOpenAbout, onOpenContact }: HeaderProps) {
  return (
    <header className="site-header shell">
      <a className="brand" href="#inicio" aria-label="Bruno Sánchez, volver al inicio">Bruno Sánchez<span className="brand-dot">.</span></a>
      <nav className="header-nav" aria-label="Navegación principal">
        <button type="button" onClick={(event) => onOpenAbout(event.currentTarget)}>Sobre mí</button>
        <button type="button" onClick={(event) => onOpenContact(event.currentTarget)}>Contacto</button>
        <a className="github-link" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Bruno Sánchez (abre en otra pestaña)">
          <GitHubIcon />
          <span className="github-text">GitHub</span>
        </a>
      </nav>
    </header>
  )
}
