"use client";
import { useCallback, useEffect, useState } from "react";
import { roleKeys, type RoleKey } from "@/lib/sim";

const KEY = "lgl-role";
const EVENT = "lgl:rolechange";

/** Shared reader role, persisted locally and synced across components on the page. */
export function useRole(initial: RoleKey = "general") {
  const [role, setRoleState] = useState<RoleKey>(initial);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as RoleKey | null;
      if (saved && roleKeys.includes(saved)) setRoleState(saved);
    } catch {}
    const onChange = (e: Event) => setRoleState((e as CustomEvent<RoleKey>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  const setRole = useCallback((r: RoleKey) => {
    setRoleState(r);
    try { localStorage.setItem(KEY, r); } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: r }));
  }, []);

  return [role, setRole] as const;
}
