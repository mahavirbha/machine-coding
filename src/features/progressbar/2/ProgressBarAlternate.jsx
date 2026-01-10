import { useState } from 'react'

function ProgressBarAlternate() {
  const [value, setValue] = useState(30)
  const clamp = (next) => Math.min(100, Math.max(0, next))

  return (
    <div className="stack">
      <p className="eyebrow">Solution 2</p>
      <h2>Interactive progress bar</h2>
      <p className="lede">Adjust the value to see the bar animate.</p>
      <div className="controls">
        <button onClick={() => setValue((v) => clamp(v - 10))}>-10%</button>
        <span className="strong">{value}%</span>
        <button onClick={() => setValue((v) => clamp(v + 10))}>+10%</button>
      </div>
      <div className="bar large">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default ProgressBarAlternate
