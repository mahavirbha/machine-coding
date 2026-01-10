import { useEffect, useState } from "react";

function ProgressbarItem({ index }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <div className="bar">
      <div className={`progress ${loaded ? "loaded" : ""} bar-fill`}>
        {index}
      </div>
    </div>
  );
}

export default ProgressbarItem;
