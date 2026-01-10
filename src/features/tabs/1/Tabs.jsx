import { useState } from 'react'

const panes = [
  { id: 'overview', title: 'Overview', body: 'Tabs switch content without reloading the page.' },
  { id: 'routing', title: 'Routing', body: 'Each tab could be tied to a URL param; here we keep it local to the component.' },
  { id: 'extend', title: 'Extend', body: 'Add more panes or wire state to URL search params for deep-linking.' },
]

function Tabs() {
  const [active, setActive] = useState(panes[0].id)

  const activePane = panes.find((pane) => pane.id === active)

  return (
    <div className="stack">
      <p className="eyebrow">Solution 1</p>
      <h2>Simple tab strip</h2>
      <p className="lede">Local state decides which pane is visible.</p>
      <div className="tab-strip">
        {panes.map((pane) => (
          <button
            key={pane.id}
            className={`tab ${pane.id === active ? 'tab-active' : ''}`}
            onClick={() => setActive(pane.id)}
          >
            {pane.title}
          </button>
        ))}
      </div>
      <div className="tab-body">
        <h3>{activePane.title}</h3>
        <p>{activePane.body}</p>
      </div>
    </div>
  )
}

export default Tabs
