import ConfettiGenerator from 'confetti-js'
import { useEffect } from 'react'

const ConfettiCanvas = ({ width, height }) => {
  useEffect(() => {
    const confettiSettings = {
      target: 'confetti-canvas'
    }
    const confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()

    return () => confetti.clear()
  }, [])
  return <canvas id="confetti-canvas" width={width} height={height} />
}

export default ConfettiCanvas
