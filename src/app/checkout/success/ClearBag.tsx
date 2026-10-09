"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

/** Empties the bag once Stripe sends the customer back after paying. */
export function ClearBag() {
  const { clear } = useCart();
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("session_id")) clear();
  }, [clear]);
  return null;
}
