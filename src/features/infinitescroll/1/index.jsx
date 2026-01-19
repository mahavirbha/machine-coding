import { useEffect, useRef, useState } from "react";
import "./styles.css";

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef(null);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || loading) return;

    const { scrollTop, clientHeight, scrollHeight } = el;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`,
          { signal: abortController.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await res.json();

        setData((prev) => [...prev, ...json]);
        setHasFetched(true);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [page, pageSize]);

  return (
    <div>
      {/* Loading */}

      {/* Error */}
      {!loading && error && <div style={{ color: "red" }}>{error}</div>}

      {/* No Data */}
      {!loading && hasFetched && data.length === 0 && <div>No data</div>}

      {/* Data */}
      {data.length > 0 && (
        <div className="container" ref={containerRef} onScroll={handleScroll}>
          {data.map((item) => (
            <div className="post" key={item.id}>
              {item.id}
              <img src={item?.download_url} />
            </div>
          ))}
          {loading && <div>Loading...</div>}
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
