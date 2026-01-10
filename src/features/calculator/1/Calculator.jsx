import { useMemo, useState } from 'react'

const keypad = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

function Calculator() {
  const [expression, setExpression] = useState('0')

  const display = useMemo(() => expression, [expression])

  const handlePress = (key) => {
    if (key === '=') {
      try {
        const result = eval(expression) // quick demo only
        setExpression(String(result))
      } catch {
        setExpression('Error')
      }
      return
    }

    if (expression === '0' && !['.', '/', '*', '+', '-'].includes(key)) {
      setExpression(key)
    } else if (expression === 'Error') {
      setExpression(key)
    } else {
      setExpression((prev) => `${prev}${key}`)
    }
  }

  const clear = () => setExpression('0')

  return (
    <div className="stack">
      <p className="eyebrow">Solution 1</p>
      <h2>Lightweight calculator</h2>
      <p className="lede">Handles basic arithmetic; uses eval for brevity.</p>
      <div className="calculator">
        <div className="calc-display">{display}</div>
        <div className="calc-grid">
          {keypad.map((key) => (
            <button key={key} onClick={() => handlePress(key)}>
              {key}
            </button>
          ))}
          <button className="calc-clear" onClick={clear}>AC</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
