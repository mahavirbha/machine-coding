import { lazy, Suspense } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import "./App.css";

const features = [
  {
    id: "progressbar",
    name: "Progress Bar",
    description: "Progressbar variations.",
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Expand and collapse content blocks.",
  },
  { id: "tabs", name: "Tabs", description: "Switch views with a tab strip." },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform quick arithmetic operations.",
  },
  {
    id: "infinitescroll",
    name: "InfiniteScroll",
    description: "Infinitely loading data on scroll",
  },
];

const solutions = {
  progressbar: {
    1: lazy(() => import("./features/progressbar/1/ProgressBar.jsx")),
    2: lazy(() => import("./features/progressbar/2/ProgressBarAlternate.jsx")),
    3: lazy(() => import("./features/progressbar/3/ProgressBar.jsx")),
    4: lazy(() => import("./features/progressbar/4/ProgressBar.jsx")),
  },
  accordion: {
    1: lazy(() => import("./features/accordion/1/Accordion.jsx")),
    2: lazy(() => import("./features/accordion/2/Accordion.jsx")),
  },
  tabs: {
    1: lazy(() => import("./features/tabs/1/Tabs.jsx")),
  },
  calculator: {
    1: lazy(() => import("./features/calculator/1/Calculator.jsx")),
  },
  infinitescroll: {
    1: lazy(() => import("./features/infinitescroll/1/index.jsx")),
    2: lazy(() => import("./features/infinitescroll/2/index.jsx")),
  },
};

function Home() {
  return (
    <div className="shell">
      <header className="header">
        <div>
          <p className="eyebrow">Machine coding playground</p>
          <h1>Pick a challenge and a solution</h1>
          <p className="lede">
            Each challenge has numbered solution folders. Routes follow
            /challenge/:solution.
          </p>
        </div>
      </header>
      <div className="grid">
        {features.map((feature) => {
          const solutionKeys = Object.keys(solutions[feature.id]);
          const firstSolution = solutionKeys[0];
          return (
            <Link
              key={feature.id}
              className="card"
              to={`/${feature.id}/${firstSolution}`}
            >
              <div className="card-top">
                <span className="tag">{feature.name}</span>
                <span className="subdued">
                  {solutionKeys.length} solution(s)
                </span>
              </div>
              <p className="card-title">{feature.description}</p>
              <div className="pill-row">
                {solutionKeys.map((key) => (
                  <span key={key} className="pill">
                    Solution {key}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FeaturePage({ featureId }) {
  const { solution } = useParams();
  const feature = features.find((item) => item.id === featureId);
  const solutionMap = solutions[featureId];

  if (!feature || !solutionMap) {
    return <Navigate to="/" replace />;
  }

  const solutionKeys = Object.keys(solutionMap);
  const fallbackKey = solutionKeys[0];
  const activeKey =
    solution && solutionKeys.includes(solution) ? solution : fallbackKey;
  const ActiveSolution = solutionMap[activeKey];

  return (
    <div className="shell">
      <header className="header">
        <div>
          <Link className="ghost" to="/">
            ← All challenges
          </Link>
          <p className="eyebrow">{feature.name}</p>
          <h1>{feature.description}</h1>
          <p className="lede">
            Pick a solution number via the route parameter.
          </p>
        </div>
        <div className="pill-row">
          {solutionKeys.map((key) => (
            <Link
              key={key}
              className={`pill ${key === activeKey ? "pill-active" : ""}`}
              to={`/${feature.id}/${key}`}
            >
              Solution {key}
            </Link>
          ))}
        </div>
      </header>
      {solution && !solutionKeys.includes(solution) ? (
        <p className="notice">
          Unknown solution {solution}; showing Solution {fallbackKey} instead.
        </p>
      ) : null}
      <Suspense fallback={<div className="panel">Loading solution…</div>}>
        <div className="panel">
          <ActiveSolution />
        </div>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {features.map((feature) => (
        <Route
          key={feature.id}
          path={`${feature.id}/:solution?`}
          element={<FeaturePage featureId={feature.id} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
