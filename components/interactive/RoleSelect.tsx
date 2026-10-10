"use client";
import { roleKeys, roleLabels, type RoleKey } from "@/lib/sim";

export function RoleSelect({ id, value, onChange }: { id: string; value: RoleKey; onChange: (r: RoleKey) => void }) {
  return (
    <div className="field">
      <label htmlFor={id}>Your role</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as RoleKey)}>
        {roleKeys.map((k) => <option key={k} value={k}>{roleLabels[k]}</option>)}
      </select>
    </div>
  );
}
