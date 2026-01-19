import "./styles.css";
import { useEffect, useRef, useState } from "react";

function InfiniteScrollRAF() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const tickingRef = useRef(false);

  const checkNearBottom = () => {
    const el = containerRef.current;
    if (!el || loading) return;

    const { scrollTop, clientHeight, scrollHeight } = el;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((p) => p + 1);
    }
  };

  const handleScroll = () => {
    if (tickingRef.current) return;

    tickingRef.current = true;

    requestAnimationFrame(() => {
      checkNearBottom();
      tickingRef.current = false;
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => el.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`,
          { signal: signal }
        );

        if (!res.ok) throw new Error("Fetch Failed");

        const json = await res.json();
        setData((prev) => [...prev, ...json]);
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [page, pageSize]);

  return (
    <div>
      <h2>InfiniteScroll using RAF (Request Animation Frame)</h2>
      {error && <div className="error">{error}</div>}
      <div className="container" ref={containerRef}>
        {data.map(({ id, download_url }) => (
          <div key={id} className="post">
            <h6>
              {id}
              <br />
              {download_url}
            </h6>
          </div>
        ))}
      </div>
      {loading && <div className="bottom">Loading...</div>}
    </div>
  );
}

export default InfiniteScrollRAF;
