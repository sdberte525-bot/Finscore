"use client";

import { createContext, useContext } from "react";

/**
 * Whether the store is taking orders. Before launch, product pages offer
 * "notify me" sign-ups instead of add-to-cart. Decided on the server in
 * src/lib/commerce/status.ts.
 */
const StoreStatus = createContext(false);

export function StoreStatusProvider({ open, children }: { open: boolean; children: React.ReactNode }) {
  return <StoreStatus.Provider value={open}>{children}</StoreStatus.Provider>;
}

export function useStoreOpen() {
  return useContext(StoreStatus);
}
