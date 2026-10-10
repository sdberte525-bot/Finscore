"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { priceLines, type PricedLine } from "@/lib/commerce/pricing";
import { maxQuantity, type CartLine, type Product, type ProductVariant } from "@/lib/commerce/types";

const STORAGE_KEY = "swolvation.bag.v2";

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine; max: number }
  | { type: "setQuantity"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "clear" };

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = lines.find((l) => l.variantId === action.line.variantId);
      if (existing) {
        return lines.map((l) =>
          l.variantId === action.line.variantId
            ? { ...l, quantity: Math.min(action.max, l.quantity + action.line.quantity) }
            : l,
        );
      }
      return [...lines, { ...action.line, quantity: Math.min(action.max, action.line.quantity) }];
    }
    case "setQuantity":
      return action.quantity <= 0
        ? lines.filter((l) => l.variantId !== action.variantId)
        : lines.map((l) => (l.variantId === action.variantId ? { ...l, quantity: action.quantity } : l));
    case "remove":
      return lines.filter((l) => l.variantId !== action.variantId);
    case "clear":
      return [];
  }
}

type CartContextValue = {
  lines: PricedLine[];
  rawLines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  /** Set when the most recent add happened, so the drawer can show what changed. */
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  add: (product: Product, variant: ProductVariant, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children, products }: { children: React.ReactNode; products: Product[] }) {
  const [rawLines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) dispatch({ type: "hydrate", lines: stored });
    } catch {
      // Storage unavailable (private mode, blocked): the bag just won't persist.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      // Ignore: persistence is a convenience.
    }
  }, [rawLines, hydrated]);

  const add = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    const max = maxQuantity(variant);
    if (max <= 0) return;
    dispatch({
      type: "add",
      line: { variantId: variant.id, slug: product.slug, size: variant.size, color: variant.color, quantity },
      max,
    });
    setLastAdded(variant.id);
    setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const { lines, subtotal } = priceLines(rawLines, products);
    return {
      lines,
      rawLines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal,
      isOpen,
      lastAdded,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQuantity: (variantId, quantity) => dispatch({ type: "setQuantity", variantId, quantity }),
      remove: (variantId) => dispatch({ type: "remove", variantId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [rawLines, products, isOpen, lastAdded, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
