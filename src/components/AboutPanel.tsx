import { useEffect, useRef } from 'react'
import { CloseIcon } from './Icons'

type AboutPanelProps = {
  trigger: HTMLElement
  onClose: () => void
}

export function AboutPanel({ trigger, onClose }: AboutPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'Tab' && panelRef.current) {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      trigger.focus()
    }
  }, [onClose, trigger])

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="about-panel" role="dialog" aria-modal="true" aria-labelledby="about-title" ref={panelRef}>
        <div className="detail-topline">
          <span>Sobre mí</span>
          <button className="close-button" type="button" onClick={onClose} ref={closeRef} aria-label="Cerrar sobre mí"><CloseIcon /></button>
        </div>
        <h2 id="about-title">Bruno Sánchez</h2>
        <p>Soy estudiante de Ingeniería en Informática en la Universidad Blas Pascal. Me interesa el desarrollo backend y crear aplicaciones que resuelvan problemas cotidianos.</p>
        <p className="about-tech">TypeScript <span>·</span> Node.js <span>·</span> PostgreSQL</p>
      </div>
    </div>
  )
}
