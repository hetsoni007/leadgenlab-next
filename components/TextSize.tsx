"use client";
import { useEffect, useState } from "react";

const SIZES = [
  { key: "s", label: "A", title: "Smaller text" },
  { key: "m", label: "A", title: "Default text" },
  { key: "l", label: "A", title: "Larger text" },
] as const;

export function TextSize() {
  const [size, setSize] = useState<string>("m");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lgl-text");
      if (saved === "s" || saved === "m" || saved === "l") {
        setSize(saved);
        document.documentElement.dataset.text = saved;
      }
    } catch {}
  }, []);

  function choose(key: string) {
    setSize(key);
    document.documentElement.dataset.text = key;
    try { localStorage.setItem("lgl-text", key); } catch {}
  }

  return (
    <div className="textsize" role="group" aria-label="Text size">
      <span>Text</span>
      {SIZES.map((s, i) => (
        <button
          key={s.key}
          type="button"
          title={s.title}
          aria-label={s.title}
          aria-pressed={size === s.key}
          style={{ fontSize: 13 + i * 3 }}
          onClick={() => choose(s.key)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
