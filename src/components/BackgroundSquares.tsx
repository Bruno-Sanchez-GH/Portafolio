const squareCount = 6

function SquareGroup({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div className={`background-square-group squares-${position}`}>
      {Array.from({ length: squareCount }, (_, index) => (
        <span className="background-square" key={index} />
      ))}
    </div>
  )
}

export function BackgroundSquares() {
  return (
    <div className="background-squares" aria-hidden="true">
      <SquareGroup position="top" />
      <SquareGroup position="bottom" />
    </div>
  )
}
