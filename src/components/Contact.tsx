import { useEffect, useRef } from 'react'
import { links } from '../data/projects'
import { CloseIcon, ExternalIcon } from './Icons'

type ContactProps = {
  trigger: HTMLElement
  onClose: () => void
}

export function Contact({ trigger, onClose }: ContactProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, a[href]'))
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
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
      <div className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title" ref={panelRef}>
        <div className="detail-topline">
          <span>Contacto</span>
          <button className="close-button" type="button" onClick={onClose} ref={closeRef} aria-label="Cerrar contacto"><CloseIcon /></button>
        </div>
        <h2 id="contact-title">Hablemos.</h2>
        <div className="contact-links">
          <a href={links.email}>brnosnchez@gmail.com <ExternalIcon /></a>
          <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub <ExternalIcon /></a>
        </div>
        <p className="contact-signature">Bruno Sánchez · Villa Allende, Córdoba</p>
      </div>
    </div>
  )
}
