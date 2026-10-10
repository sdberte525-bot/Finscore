import "server-only";
import { products } from "@/data/products";
import type { Product } from "./types";

export async function fetchLocalCatalog(): Promise<Product[]> {
  return products;
}
