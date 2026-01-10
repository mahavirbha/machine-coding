import { useState } from "react";
import ProgessBarItem from "./ProgessBarItem";
import "./styles.css";

const timer = 2000; //ms

function ProgressBar() {
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <p className="eyebrow">Solution 1</p>
      <h2>
        Add Progressbar on button click | progressing as per timer defined 200ms
      </h2>
      <h3>CSS + loaded state + setTimeout(0ms)</h3>
      <p className="lede">Adjust the value to see the bar animate.</p>
      <div className="controls">
        <button onClick={() => setCount((p) => p + 1)}>+ Add </button>
      </div>

      {Array.from({ length: count }).map((_, index) => {
        return <ProgessBarItem key={index} index={index} timer={timer} />;
      })}
    </div>
  );
}

export default ProgressBar;
