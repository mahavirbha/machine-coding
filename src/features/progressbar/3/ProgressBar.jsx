import { useState } from "react";
import ProgressbarItem from "./ProgressbarItem";

function ProgressBar() {
  const [count, setCount] = useState(0);
  return (
    <div className="stack">
      <p className="eyebrow">Solution 3</p>
      <h2>Add Progreebar on click of Add button</h2>
      <p className="lede">CSS + loaded state + requestAnimationFrame()</p>
      <div className="controls">
        <button onClick={() => setCount((p) => p + 1)}>+ Add </button>
      </div>

      {Array.from({ length: count }).map((_, index) => {
        return <ProgressbarItem key={index} index={index} />;
      })}
    </div>
  );
}

export default ProgressBar;
