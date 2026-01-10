import { useEffect, useState } from "react";

function ProgessBarItem({ index, timer = 2000 }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoaded(true);
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, [timer]);

  return (
    <div className="bar">
      <div className={`progress ${loaded ? "loaded" : ""} bar-fill`}>
        {index}
      </div>
    </div>
  );
}

export default ProgessBarItem;
