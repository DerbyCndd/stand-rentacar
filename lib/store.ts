"use client";
import { useCallback, useSyncExternalStore } from "react";
import type { Lead, RentalCar, Vehicle } from "./types";
import { seedRentals, seedVehicles } from "./data";

/**
 * Armazenamento local (no navegador) com useSyncExternalStore. Serve para demonstrar o painel
 * de gestão num alojamento estático (GitHub Pages). Para produção, troque por uma base de dados
 * (ver README): basta reimplementar este ficheiro com chamadas à API.
 */
const KEYS = {
  vehicles: "kwanza.vehicles.v1",
  rentals: "kwanza.rentals.v1",
  leads: "kwanza.leads.v1",
} as const;
type Key = keyof typeof KEYS;
const EVT = "kwanza-store";
const NO_LEADS: Lead[] = [];

const cache = new Map<Key, { raw: string | null; list: unknown[] }>();

function snapshot<T>(key: Key, seed: T[]): T[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEYS[key]);
  } catch {
    /* indisponível */
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.list as T[];
  let list: T[] = seed;
  if (raw) {
    try {
      list = JSON.parse(raw) as T[];
    } catch {
      /* dados corrompidos: usa os de exemplo */
    }
  }
  cache.set(key, { raw, list });
  return list;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
const noop = () => () => {};

function write<T>(key: Key, list: T[]) {
  try {
    localStorage.setItem(KEYS[key], JSON.stringify(list));
  } catch {
    /* quota cheia ou modo privado */
  }
  window.dispatchEvent(new Event(EVT));
}

function useCollection<T>(key: Key, seed: T[]) {
  const list = useSyncExternalStore(subscribe, () => snapshot(key, seed), () => seed);
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const save = useCallback((next: T[]) => write(key, next), [key]);
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(KEYS[key]);
    } catch {
      /* ignorar */
    }
    window.dispatchEvent(new Event(EVT));
  }, [key]);
  return { list, save, reset, ready };
}

export const useVehicles = () => useCollection<Vehicle>("vehicles", seedVehicles);
export const useRentals = () => useCollection<RentalCar>("rentals", seedRentals);
export const useLeads = () => useCollection<Lead>("leads", NO_LEADS);

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "done">) {
  const list = snapshot<Lead>("leads", NO_LEADS);
  const full: Lead = {
    ...lead,
    id: Math.random().toString(36).slice(2, 9),
    createdAt: new Date().toISOString(),
    done: false,
  };
  write("leads", [full, ...list]);
}

/* Sessão do painel (apenas demonstração) */
const SESSION = "kwanza.admin.session";
const SESSION_EVT = "kwanza-session";
export function useAdminSession() {
  const state = useSyncExternalStore(
    (cb) => {
      window.addEventListener(SESSION_EVT, cb);
      return () => window.removeEventListener(SESSION_EVT, cb);
    },
    () => {
      try {
        return sessionStorage.getItem(SESSION) === "1" ? "in" : "out";
      } catch {
        return "out";
      }
    },
    () => "unknown",
  );
  const set = (v: boolean) => {
    try {
      if (v) sessionStorage.setItem(SESSION, "1");
      else sessionStorage.removeItem(SESSION);
    } catch {
      /* ignorar */
    }
    window.dispatchEvent(new Event(SESSION_EVT));
  };
  return { state, login: () => set(true), logout: () => set(false) };
}
