import { links } from '../data/projects'
import { ExternalIcon } from './Icons'

type CVCardProps = {
  interactive: boolean
}

export function CVCard({ interactive }: CVCardProps) {
  return (
    <>
      <div className="media-frame media-paper">
        <img className="project-image cv-image" src={links.cvPreview} alt="Vista previa de la primera página del CV de Bruno Sánchez" loading={interactive ? 'eager' : 'lazy'} draggable={false} />
      </div>
      <div className="slide-info">
        <div className="slide-heading">
          <h2>Mi CV</h2>
          <p>Curriculum vitae</p>
        </div>
        <div className="slide-actions">
          <a className="primary-action" href={links.cvPdf} target="_blank" rel="noopener noreferrer" tabIndex={interactive ? 0 : -1}>
            Ver CV <ExternalIcon />
          </a>
          <a className="secondary-action" href={links.cvPdf} download="Bruno_Sanchez_CV.pdf" tabIndex={interactive ? 0 : -1}>Descargar PDF</a>
        </div>
      </div>
    </>
  )
}
