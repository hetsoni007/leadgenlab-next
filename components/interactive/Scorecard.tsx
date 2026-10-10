"use client";
import { useState } from "react";

export function Scorecard({ criteria }: { criteria: string[] }) {
  const [a, setA] = useState<number[]>(criteria.map(() => 0));
  const [b, setB] = useState<number[]>(criteria.map(() => 0));
  const sum = (x: number[]) => x.reduce((s, v) => s + v, 0);
  const filled = a.every((v) => v > 0) && b.every((v) => v > 0);
  const max = criteria.length * 5;
  const ta = sum(a), tb = sum(b);
  const verdict = !filled ? null : Math.abs(ta - tb) <= 1 ? "Too close to call on this task. Try a second, different task before you decide." : ta > tb ? "ChatGPT needed less correction on this task." : "Claude needed less correction on this task.";

  return (
    <section className="sim" aria-labelledby="sc-h">
      <p className="eyebrow">Your scorecard</p>
      <h2 id="sc-h">Score both answers</h2>
      <p className="muted">1 = poor, 5 = excellent. Judge only what you can check yourself.</p>
      <div className="table-wrap">
        <table className="score">
          <thead><tr><th>Criterion</th><th>ChatGPT</th><th>Claude</th></tr></thead>
          <tbody>
            {criteria.map((label, i) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {[a, b].map((arr, k) => (
                  <td key={k}>
                    <select
                      aria-label={`${k === 0 ? "ChatGPT" : "Claude"}: ${label}`}
                      value={arr[i]}
                      onChange={(e) => (k === 0 ? setA : setB)((s) => s.map((v, j) => (j === i ? Number(e.target.value) : v)))}
                    >
                      <option value={0}>Score</option>
                      {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot><tr><th>Total (out of {max})</th><td>{ta}</td><td>{tb}</td></tr></tfoot>
        </table>
      </div>
      <p className="sim-out" role="status" aria-live="polite">
        {verdict ?? "Fill in every score to see your result. Nothing is sent anywhere."}
      </p>
    </section>
  );
}
