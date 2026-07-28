"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { isZone, type Zone } from "@/lib/shipping/zones";

const STORAGE_KEY = "png-coffee-zone";

type ZoneContextValue = {
  /** The chosen postal zone, or null until the customer picks one. */
  zone: Zone | null;
  setZone: (zone: Zone) => void;
  hydrated: boolean;
};

const ZoneContext = createContext<ZoneContextValue | null>(null);

export function ZoneProvider({ children }: { children: ReactNode }) {
  const [zone, setZoneState] = useState<Zone | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? Number(raw) : null;
      if (isZone(parsed)) setZoneState(parsed);
    } catch {
      // ignore inaccessible storage
    } finally {
      setHydrated(true);
    }
  }, []);

  const setZone = useCallback((next: Zone) => {
    setZoneState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore inaccessible storage
    }
  }, []);

  return (
    <ZoneContext.Provider value={{ zone, setZone, hydrated }}>
      {children}
    </ZoneContext.Provider>
  );
}

export function useZone(): ZoneContextValue {
  const ctx = useContext(ZoneContext);
  if (!ctx) throw new Error("useZone must be used within a <ZoneProvider>");
  return ctx;
}
