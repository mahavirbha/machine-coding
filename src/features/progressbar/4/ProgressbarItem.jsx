import "./styles.css";

function ProgressbarItem({ index }) {
  return (
    <div className="bar">
      <div className={`progress bar-fill`}>{index}</div>
    </div>
  );
}

export default ProgressbarItem;
