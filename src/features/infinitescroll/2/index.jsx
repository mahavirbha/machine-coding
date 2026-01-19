import { useEffect, useRef, useState } from "react";
import "./styles.css";

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`,
          { signal: abortController.signal }
        );

        if (!res.ok) throw new Error("Fetch Failed");

        const json = await res.json();
        setData((prev) => [...prev, ...json]);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false); // ✅ only if not aborted
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [page, pageSize]);

  useEffect(() => {
    if (!footerRef.current || !containerRef.current || loading) return;
    const options = {
      root: containerRef.current,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          setPage((prev) => prev + 1);
        }
      });
    }, options);
    const footerEle = footerRef.current;
    observer.observe(footerEle);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      <h2>using IntersectionObserver()</h2>
      <br />
      <div className="container" ref={containerRef}>
        {error && <div>{error}</div>}
        {data?.map(({ id, download_url }) => (
          <div key={id} className="post">
            <div>{id}</div>
            <div>
              <img src={download_url} />
            </div>
          </div>
        ))}
        <div className="footer" ref={footerRef}>
          Loding...
        </div>
      </div>
    </div>
  );
}

export default InfiniteScroll;
