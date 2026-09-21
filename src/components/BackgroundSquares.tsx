type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

function SquareGroup({ corner, count }: { corner: Corner; count: number }) {
  return (
    <div className={`background-square-group squares-${corner}`}>
      {Array.from({ length: count }, (_, index) => (
        <span className="background-square" key={index} />
      ))}
    </div>
  )
}

type BackgroundSquaresProps = {
  variant?: 'page' | 'card'
  active?: boolean
}

export function BackgroundSquares({ variant = 'page', active = true }: BackgroundSquaresProps) {
  const groups: readonly Corner[] = variant === 'card'
    ? ['top-right', 'bottom-left']
    : ['top-left', 'bottom-right']

  return (
    <div className={`background-squares squares-${variant}${active ? '' : ' is-paused'}`} aria-hidden="true">
      {groups.map((corner) => <SquareGroup corner={corner} count={variant === 'card' ? 5 : 6} key={corner} />)}
    </div>
  )
}
