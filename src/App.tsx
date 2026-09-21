import { useCallback, useState } from 'react'
import type { Project } from './data/projects'
import { Header } from './components/Header'
import { Introduction } from './components/Introduction'
import { ProjectCarousel } from './components/ProjectCarousel'
import { ProjectModal } from './components/ProjectModal'
import { Contact } from './components/Contact'
import { AboutPanel } from './components/AboutPanel'
import { BackgroundSquares } from './components/BackgroundSquares'

type SelectedDetail = { project: Project; trigger: HTMLElement }

export default function App() {
  const [detail, setDetail] = useState<SelectedDetail | null>(null)
  const [contactTrigger, setContactTrigger] = useState<HTMLElement | null>(null)
  const [aboutTrigger, setAboutTrigger] = useState<HTMLElement | null>(null)
  const closeDetail = useCallback(() => setDetail(null), [])
  const closeContact = useCallback(() => setContactTrigger(null), [])
  const closeAbout = useCallback(() => setAboutTrigger(null), [])
  const overlayOpen = Boolean(detail || contactTrigger || aboutTrigger)

  return (
    <>
      <div id="inicio" className="page" inert={overlayOpen}>
        <BackgroundSquares />
        <Header onOpenAbout={setAboutTrigger} onOpenContact={setContactTrigger} />
        <main className="shell main-content">
          <Introduction />
          <ProjectCarousel shortcutsDisabled={overlayOpen} onOpenDetails={(project, trigger) => setDetail({ project, trigger })} />
        </main>
      </div>
      {detail && <ProjectModal project={detail.project} trigger={detail.trigger} onClose={closeDetail} />}
      {contactTrigger && <Contact trigger={contactTrigger} onClose={closeContact} />}
      {aboutTrigger && <AboutPanel trigger={aboutTrigger} onClose={closeAbout} />}
    </>
  )
}
