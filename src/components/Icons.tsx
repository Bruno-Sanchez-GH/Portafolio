import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.12c-3.09.67-3.74-1.31-3.74-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.6-.48 1.98-.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.49 0-1.22.43-2.22 1.14-3-.12-.28-.49-1.42.11-2.95 0 0 .93-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.04-1.15 3.04-1.15.61 1.53.23 2.67.12 2.95.71.78 1.13 1.78 1.13 3.01 0 4.26-2.6 5.2-5.08 5.48.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  )
}
