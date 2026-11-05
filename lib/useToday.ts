"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Data de hoje (AAAA-MM-DD) no cliente; "" no servidor/pré-render, evitando datas antigas do build. */
export function useToday(): string {
  return useSyncExternalStore(
    noop,
    () => new Date().toISOString().slice(0, 10),
    () => "",
  );
}

export function addDays(isoDate: string, n: number): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  if (!from || !to) return 1;
  return Math.max(1, Math.round((+new Date(to) - +new Date(from)) / 864e5));
}
