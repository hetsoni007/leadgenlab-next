"use client";
import { useEffect, useRef, useState } from "react";
import { flowSteps, roleLabels } from "@/lib/sim";
import { useRole } from "@/lib/useRole";
import { RoleSelect } from "./RoleSelect";

type Props = { kind: string; task: string; title?: string; id?: string };

export function WorkflowSim({ kind, task: initialTask, title = "Walk through the workflow", id = "sim" }: Props) {
  const steps = flowSteps[kind] ?? flowSteps.release;
  const [role, setRole] = useRole();
  const [task, setTask] = useState(initialTask);
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setActive(-1); setDone(0); setFinished(false); setRunning(false);
  }

  function run(e: React.FormEvent) {
    e.preventDefault();
    if (!task.trim() || running) return;
    reset();
    setRunning(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setActive(i); setDone(i);
        i++;
        timer.current = setTimeout(tick, reduced ? 0 : 750);
      } else {
        setActive(-1); setDone(steps.length); setRunning(false); setFinished(true);
      }
    };
    tick();
  }

  const status = finished
    ? `Practice result for ${roleLabels[role]}: “${task.trim()}” has passed through the example workflow. Before using it, check the source, sensitive data, and the human approval point. This is a learning simulation: no AI service was called and nothing was sent.`
    : active >= 0
      ? `Step ${active + 1} of ${steps.length}: ${steps[active][0]}. ${steps[active][1]}`
      : "Ready when you are. This runs in your browser; nothing is sent to an AI service.";

  return (
    <section className="sim" aria-labelledby={`${id}-h`}>
      <div className="sim-top">
        <span className="live">Workflow lab</span>
        <span>Local simulation · no AI request sent</span>
      </div>
      <p className="eyebrow">Try this workflow</p>
      <h2 id={`${id}-h`}>{title}</h2>
      <form className="sim-form" onSubmit={run}>
        <div className="field">
          <label htmlFor={`${id}-task`}>Safe sample task</label>
          <input id={`${id}-task`} value={task} maxLength={180} required onChange={(e) => { setTask(e.target.value); if (finished) reset(); }} />
        </div>
        <RoleSelect id={`${id}-role`} value={role} onChange={setRole} />
        <button className="btn" type="submit" disabled={running}>
          {running ? "Running…" : finished ? "Run it again" : "Run the walkthrough"}
        </button>
      </form>
      <ol className="stages" aria-label="Walkthrough stages">
        {steps.map(([name, desc], i) => (
          <li key={name} className={i === active ? "is-active" : i < done ? "is-done" : undefined}>
            <span>{String(i + 1).padStart(2, "0")}{i < done ? " ✓" : ""}</span>
            <strong>{name}</strong>
            <small>{desc}</small>
          </li>
        ))}
      </ol>
      <p className="sim-out" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
