"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { isZoneId, type ZoneId } from "@/lib/shipping/zones";

const STORAGE_KEY = "png-coffee-zone";

type ZoneContextValue = {
  zone: ZoneId | null;
  setZone: (zone: ZoneId) => void;
  hydrated: boolean;
};

const ZoneContext = createContext<ZoneContextValue | null>(null);

export function ZoneProvider({ children }: { children: ReactNode }) {
  const [zone, setZoneState] = useState<ZoneId | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (isZoneId(raw)) setZoneState(raw);
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  const setZone = useCallback((next: ZoneId) => {
    setZoneState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ZoneContext.Provider value={{ zone, setZone, hydrated }}>{children}</ZoneContext.Provider>
  );
}

export function useZone(): ZoneContextValue {
  const ctx = useContext(ZoneContext);
  if (!ctx) throw new Error("useZone must be used within a <ZoneProvider>");
  return ctx;
}
