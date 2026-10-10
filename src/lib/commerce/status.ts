import "server-only";
import { checkoutMethod } from "./checkout";

/*
 * The store is open when a checkout is connected (Shopify or Stripe), unless
 * STORE_MODE says otherwise:
 *   STORE_MODE=prelaunch  keep "notify me" sign-ups even with checkout connected (until drop day)
 *   STORE_MODE=open       always show add-to-cart
 */
export function isStoreOpen(): boolean {
  const mode = process.env.STORE_MODE;
  if (mode === "prelaunch") return false;
  if (mode === "open") return true;
  return checkoutMethod() !== null;
}
