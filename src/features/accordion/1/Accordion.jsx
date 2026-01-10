import { useState } from 'react'

const items = [
  { id: 'a', title: 'What is an accordion?', body: 'A vertically stacked list of headers that reveal content when expanded.' },
  { id: 'b', title: 'How does routing work?', body: 'Each challenge maps to a route, and the solution number is read from the URL parameter.' },
  { id: 'c', title: 'Can I add more?', body: 'Yes. Drop another numbered folder under the feature and wire it in the solutions map.' },
]

function Accordion() {
  const [openId, setOpenId] = useState(items[0].id)

  return (
    <div className="stack">
      <p className="eyebrow">Solution 1</p>
      <h2>Single-open accordion</h2>
      <p className="lede">Click a header to toggle. Only one pane stays open.</p>
      <div className="stack gap-sm">
        {items.map((item) => (
          <div key={item.id} className="accordion">
            <button className="accordion-header" onClick={() => setOpenId(item.id)}>
              <span>{item.title}</span>
              <span>{openId === item.id ? '−' : '+'}</span>
            </button>
            {openId === item.id ? <p className="accordion-body">{item.body}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accordion
