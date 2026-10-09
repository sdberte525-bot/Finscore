import type { Metadata } from "next";
import Link from "next/link";
import { ClearBag } from "./ClearBag";

export const metadata: Metadata = { title: "Order placed", robots: { index: false } };

export default function SuccessPage() {
  return (
    <div data-tone="light" className="gutter flex min-h-[80vh] flex-col justify-center bg-bone pb-32 pt-32">
      <ClearBag />
      <h1 className="fraktur text-[3.5rem] md:text-[6rem]">Thank you.</h1>
      <p className="mt-6 max-w-[44ch] text-lg">
        Your order is in. A confirmation with your receipt is on its way to your inbox, and tracking follows when it ships.
      </p>
      <div className="mt-10">
        <Link href="/" className="button button-solid">
          Back to Swolvation
        </Link>
      </div>
    </div>
  );
}
