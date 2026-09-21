import { useCallback, useRef, useState } from 'react'
import type { ShowcaseProject } from './data/projects'
import { Header } from './components/Header'
import { Introduction } from './components/Introduction'
import { ProjectCarousel } from './components/ProjectCarousel'
import type { ProjectCarouselHandle } from './components/ProjectCarousel'
import { ProjectModal } from './components/ProjectModal'
import { Contact } from './components/Contact'
import { BackgroundSquares } from './components/BackgroundSquares'
import { IntroReveal } from './components/IntroReveal'

type SelectedDetail = { project: ShowcaseProject; trigger: HTMLElement }

export default function App() {
  const [detail, setDetail] = useState<SelectedDetail | null>(null)
  const [contactTrigger, setContactTrigger] = useState<HTMLElement | null>(null)
  const carouselRef = useRef<ProjectCarouselHandle>(null)
  const closeDetail = useCallback(() => setDetail(null), [])
  const closeContact = useCallback(() => setContactTrigger(null), [])
  const overlayOpen = Boolean(detail || contactTrigger)

  return (
    <>
      <div id="inicio" className="page" inert={overlayOpen}>
        <BackgroundSquares />
        <Header onSelectAbout={() => carouselRef.current?.selectProject('about')} onOpenContact={setContactTrigger} />
        <main className="shell main-content">
          <Introduction />
          <ProjectCarousel ref={carouselRef} shortcutsDisabled={overlayOpen} onOpenDetails={(project, trigger) => setDetail({ project, trigger })} />
        </main>
      </div>
      {detail && <ProjectModal project={detail.project} trigger={detail.trigger} onClose={closeDetail} />}
      {contactTrigger && <Contact trigger={contactTrigger} onClose={closeContact} />}
      <IntroReveal />
    </>
  )
}
