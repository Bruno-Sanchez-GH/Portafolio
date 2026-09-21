import { aboutContent } from '../data/projects'
import { BackgroundSquares } from './BackgroundSquares'

type AboutCardProps = {
  active: boolean
}

export function AboutCard({ active }: AboutCardProps) {
  return (
    <div className="media-frame about-card-frame">
      <BackgroundSquares variant="card" active={active} />
      <div className="about-card-content">
        <p className="about-card-kicker">Sobre mí</p>
        <h2>{aboutContent.title}</h2>

        <div className="about-card-education">
          <p>{aboutContent.education}</p>
          <img src={aboutContent.universityLogo} alt="Universidad Blas Pascal" />
        </div>

        <p className="about-card-focus">{aboutContent.focus}</p>

        <ul className="about-technologies" aria-label="Tecnologías principales">
          {aboutContent.technologies.map((technology) => (
            <li key={technology.name}>
              <img src={technology.logo} alt="" aria-hidden="true" />
              <span>{technology.name}</span>
            </li>
          ))}
        </ul>

        <p className="about-card-internship">{aboutContent.internship}</p>
      </div>
    </div>
  )
}
