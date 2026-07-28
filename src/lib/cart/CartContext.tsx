"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";
import { useZone } from "@/lib/zone/ZoneContext";
import { quoteOrder, type OrderQuote } from "@/lib/shipping/zones";

const STORAGE_KEY = "png-coffee-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  /** Total number of 350g bags across the cart. */
  bagCount: number;
  /** Order maths for the current zone (subtotal/shipping/gst/total). */
  quote: OrderQuote;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { zone } = useZone();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // start empty on corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart still works this session
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const bagCount = useMemo(
    () => items.reduce((s, i) => s + i.size * i.quantity, 0),
    [items]
  );

  // Order maths re-derive whenever items OR zone change (so shipping/GST update
  // automatically when the customer switches zone). Falls back to a goods-only
  // subtotal until a zone is chosen.
  const quote = useMemo<OrderQuote>(() => {
    if (!zone) {
      const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
      return { subtotal: Math.round(subtotal * 100) / 100, shipping: 0, gst: 0, total: Math.round(subtotal * 100) / 100 };
    }
    return quoteOrder(
      zone,
      items.map((i) => ({ productId: i.productId, size: i.size, quantity: i.quantity }))
    );
  }, [items, zone]);

  const value: CartContextValue = {
    items,
    itemCount,
    bagCount,
    quote,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a <CartProvider>");
  return ctx;
}
