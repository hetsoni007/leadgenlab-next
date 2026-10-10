"use client";
import { useState } from "react";
import { learningPaths } from "@/lib/sim";
import { useRole } from "@/lib/useRole";
import { RoleSelect } from "./RoleSelect";

export function RoleLens() {
  const [role, setRole] = useRole();
  const [depth, setDepth] = useState<"simple" | "technical">("simple");
  const [active, setActive] = useState(0);
  const path = learningPaths[role];
  const task = path.tasks[active];

  return (
    <section className="sim" aria-labelledby="lens-h">
      <p className="eyebrow">Your route through this update</p>
      <h2 id="lens-h">Make it relevant to your role</h2>
      <div className="lens-controls">
        <RoleSelect id="lens-role" value={role} onChange={(r) => { setRole(r); setActive(0); }} />
        <div className="field">
          <span className="label">Depth</span>
          <div className="seg" role="group" aria-label="Depth">
            <button type="button" aria-pressed={depth === "simple"} onClick={() => setDepth("simple")}>Plain English</button>
            <button type="button" aria-pressed={depth === "technical"} onClick={() => setDepth("technical")}>Technical</button>
          </div>
        </div>
      </div>
      <div className="lens-example">
        <small>Personalised for {path.label.toLowerCase()}</small>
        <strong>{path.example}</strong>
        <p>{depth === "simple" ? path.simple : path.technical}</p>
      </div>
      <ol className="route" aria-label="Learning route">
        {path.tasks.map((t, i) => (
          <li key={t[0]}>
            <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{t[0]}</b>
              <small>{t[1]}</small>
            </button>
          </li>
        ))}
      </ol>
      <p className="route-detail" role="status" aria-live="polite">
        <b>{task[1]}.</b> {task[2]}{depth === "technical" ? " " + path.technical : ""}
      </p>
    </section>
  );
}
