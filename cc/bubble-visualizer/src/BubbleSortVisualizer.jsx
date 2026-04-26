import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  unsorted: "#378ADD",
  comparing: "#EF9F27",
  swapping: "#E24B4A",
  sorted: "#639922",
};

function generateArray(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

function precompute(arr) {
  const steps = [];
  const a = [...arr];
  for (let p = 0; p < a.length; p++) {
    for (let k = 0; k < a.length - p - 1; k++) {
      steps.push({ type: "compare", i: k, j: k + 1, arr: [...a], pass: p });
      if (a[k] > a[k + 1]) {
        [a[k], a[k + 1]] = [a[k + 1], a[k]];
        steps.push({ type: "swap", i: k, j: k + 1, arr: [...a], pass: p });
      }
    }
    steps.push({ type: "sorted", idx: a.length - p - 1, arr: [...a], pass: p });
  }
  steps.push({ type: "done", arr: [...a], pass: a.length });
  return steps;
}

export default function BubbleSortVisualizer() {
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(2);
  const [arr, setArr] = useState(() => generateArray(20));
  const [sorted, setSorted] = useState(new Array(20).fill(false));
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [cmps, setCmps] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [pass, setPass] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [log, setLog] = useState("Press Generate then Sort to begin.");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const stepsRef = useRef([]);
  const stepIdxRef = useRef(0);
  const sortedRef = useRef(new Array(20).fill(false));
  const cmpsRef = useRef(0);
  const swapsRef = useRef(0);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const runningRef = useRef(false);
  const speedRef = useRef(2);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  const drawStep = useCallback((s) => {
    if (!s) return;
    setComparing([]);
    setSwapping([]);

    if (s.type === "compare") {
      cmpsRef.current++;
      setCmps(cmpsRef.current);
      setComparing([s.i, s.j]);
      setPass(s.pass + 1);
      setLog(`Pass ${s.pass + 1}: Comparing [${s.i}]=${s.arr[s.i]} and [${s.j}]=${s.arr[s.j]}`);
    } else if (s.type === "swap") {
      swapsRef.current++;
      setSwapCount(swapsRef.current);
      setSwapping([s.i, s.j]);
      setLog(`→ Swapped! ${s.arr[s.j]} ↔ ${s.arr[s.i]}`);
    } else if (s.type === "sorted") {
      sortedRef.current = [...sortedRef.current];
      sortedRef.current[s.idx] = true;
      setSorted([...sortedRef.current]);
      setLog(`Position ${s.idx} locked in place ✓`);
    } else if (s.type === "done") {
      const allSorted = new Array(s.arr.length).fill(true);
      setSorted(allSorted);
      sortedRef.current = allSorted;
      setDone(true);
      setRunning(false);
      runningRef.current = false;
      setStatus("Done!");
      setLog("Sorting complete! All elements are in order.");
    }

    setArr([...s.arr]);
  }, []);

  const animate = useCallback(() => {
    if (!runningRef.current || pausedRef.current) return;
    const s = stepsRef.current[stepIdxRef.current];
    if (!s) return;
    stepIdxRef.current++;
    drawStep(s);
    if (s.type !== "done") {
      timerRef.current = setTimeout(animate, Math.round(1200 / speedRef.current));
    }
  }, [drawStep]);

  const handleGenerate = useCallback(() => {
    clearTimeout(timerRef.current);
    runningRef.current = false;
    pausedRef.current = false;
    setRunning(false);
    setDone(false);
    setStatus("Ready");
    setComparing([]);
    setSwapping([]);
    setCmps(0);
    setSwapCount(0);
    setPass(0);
    cmpsRef.current = 0;
    swapsRef.current = 0;
    sortedRef.current = new Array(size).fill(false);
    setSorted(new Array(size).fill(false));
    const newArr = generateArray(size);
    stepsRef.current = precompute(newArr);
    stepIdxRef.current = 0;
    setArr(newArr);
    setLog("Array generated. Press Sort or Step to begin.");
  }, [size]);

  const handleSort = useCallback(() => {
    if (stepsRef.current.length === 0) return;
    runningRef.current = true;
    pausedRef.current = false;
    setRunning(true);
    setStatus("Sorting…");
    timerRef.current = setTimeout(animate, Math.round(1200 / speedRef.current));
  }, [animate]);

  const handleStep = useCallback(() => {
    clearTimeout(timerRef.current);
    runningRef.current = false;
    pausedRef.current = true;
    setRunning(false);
    setStatus("Stepping");
    const s = stepsRef.current[stepIdxRef.current];
    if (s) { stepIdxRef.current++; drawStep(s); }
  }, [drawStep]);

  const handlePause = useCallback(() => {
    if (!runningRef.current) return;
    pausedRef.current = !pausedRef.current;
    if (!pausedRef.current) {
      setStatus("Sorting…");
      timerRef.current = setTimeout(animate, Math.round(1200 / speedRef.current));
    } else {
      setStatus("Paused");
      clearTimeout(timerRef.current);
    }
  }, [animate]);

  const handleReset = useCallback(() => {
    clearTimeout(timerRef.current);
    runningRef.current = false;
    pausedRef.current = false;
    setRunning(false);
    setDone(false);
    setStatus("Ready");
    setComparing([]);
    setSwapping([]);
    setCmps(0);
    setSwapCount(0);
    setPass(0);
    cmpsRef.current = 0;
    swapsRef.current = 0;
    sortedRef.current = new Array(arr.length).fill(false);
    setSorted(new Array(arr.length).fill(false));
    stepIdxRef.current = 0;
    stepsRef.current = precompute(arr);
    setLog("Reset. Press Sort or Step.");
  }, [arr]);

  useEffect(() => {
    const newArr = generateArray(size);
    stepsRef.current = precompute(newArr);
    stepIdxRef.current = 0;
    sortedRef.current = new Array(size).fill(false);
    setSorted(new Array(size).fill(false));
    setArr(newArr);
    setComparing([]);
    setSwapping([]);
    setCmps(0); setSwapCount(0); setPass(0);
    cmpsRef.current = 0; swapsRef.current = 0;
    setDone(false); setRunning(false); setStatus("Ready");
    setLog("Array generated. Press Sort or Step to begin.");
  }, [size]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const maxVal = Math.max(...arr, 1);
  const barW = Math.max(6, Math.floor((640 - (arr.length + 1) * 3) / arr.length));

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#0f1117",
      minHeight: "100vh",
      padding: "2rem",
      color: "#e8e6df",
    }}>
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: 400,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#c9c5bc",
        marginBottom: "0.25rem",
      }}>Bubble Sort</h1>
      <p style={{ fontSize: "11px", color: "#555", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
        VISUALIZER — WATCH ELEMENTS RISE TO THEIR PLACE
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "COMPARISONS", value: cmps },
          { label: "SWAPS", value: swapCount },
          { label: "PASS", value: pass },
          { label: "STATUS", value: status, small: true },
        ].map(({ label, value, small }) => (
          <div key={label} style={{
            background: "#181c24",
            border: "0.5px solid #2a2e3a",
            borderRadius: "8px",
            padding: "10px 16px",
            minWidth: "110px",
          }}>
            <div style={{ fontSize: "10px", color: "#555", letterSpacing: "0.1em", marginBottom: "4px" }}>{label}</div>
            <div style={{ fontSize: small ? "14px" : "22px", fontWeight: 500, color: "#e8e6df", paddingTop: small ? "4px" : 0 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: "#555", letterSpacing: "0.08em" }}>SIZE</span>
          <input type="range" min="5" max="40" value={size} step="1"
            onChange={e => setSize(+e.target.value)}
            style={{ width: "90px", accentColor: "#378ADD" }} />
          <span style={{ fontSize: "12px", color: "#c9c5bc", minWidth: "20px" }}>{size}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: "#555", letterSpacing: "0.08em" }}>SPEED</span>
          <input type="range" min="1" max="10" value={speed} step="1"
            onChange={e => setSpeed(+e.target.value)}
            style={{ width: "90px", accentColor: "#EF9F27" }} />
          <span style={{ fontSize: "12px", color: "#c9c5bc", minWidth: "20px" }}>{speed}</span>
        </div>
      </div>

      {/* Bars */}
      <div style={{
        background: "#181c24",
        border: "0.5px solid #2a2e3a",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        overflowX: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", height: "240px", gap: "3px", minWidth: "fit-content" }}>
          {arr.map((v, k) => {
            const bh = Math.max(6, Math.floor((v / maxVal) * 220));
            let color = COLORS.unsorted;
            if (sorted[k]) color = COLORS.sorted;
            if (comparing.includes(k)) color = COLORS.comparing;
            if (swapping.includes(k)) color = COLORS.swapping;
            return (
              <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                {barW > 20 && (
                  <span style={{ fontSize: "9px", color: comparing.includes(k) || swapping.includes(k) ? "#fff" : "#555" }}>
                    {v}
                  </span>
                )}
                <div style={{
                  width: `${barW}px`,
                  height: `${bh}px`,
                  background: color,
                  borderRadius: "3px 3px 0 0",
                  transition: "height 0.12s ease, background 0.1s ease",
                  opacity: sorted[k] ? 0.85 : 1,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "14px", marginBottom: "12px", flexWrap: "wrap" }}>
        {[
          { color: COLORS.unsorted, label: "Unsorted" },
          { color: COLORS.comparing, label: "Comparing" },
          { color: COLORS.swapping, label: "Swapping" },
          { color: COLORS.sorted, label: "Sorted" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            <span style={{ fontSize: "11px", color: "#666", letterSpacing: "0.06em" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Log */}
      <div style={{
        background: "#181c24",
        border: "0.5px solid #2a2e3a",
        borderRadius: "8px",
        padding: "8px 14px",
        marginBottom: "14px",
        fontSize: "12px",
        color: "#888",
        minHeight: "36px",
      }}>
        {log}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {[
          { label: "Generate", onClick: handleGenerate },
          { label: "Sort", onClick: handleSort, accent: true },
          { label: "Step", onClick: handleStep },
          { label: running ? "Pause" : "Resume", onClick: handlePause, show: running || status === "Paused" },
          { label: "Reset", onClick: handleReset },
        ].filter(b => b.show !== false).map(({ label, onClick, accent }) => (
          <button key={label} onClick={onClick} style={{
            background: accent ? "#1a2a3a" : "#181c24",
            border: `0.5px solid ${accent ? "#378ADD" : "#2a2e3a"}`,
            color: accent ? "#378ADD" : "#c9c5bc",
            borderRadius: "6px",
            padding: "8px 16px",
            fontSize: "12px",
            letterSpacing: "0.08em",
            cursor: "pointer",
            fontFamily: "inherit",
            textTransform: "uppercase",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#222839"}
            onMouseLeave={e => e.currentTarget.style.background = accent ? "#1a2a3a" : "#181c24"}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}