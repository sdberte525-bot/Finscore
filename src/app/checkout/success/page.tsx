import type { Metadata } from "next";
import Link from "next/link";
import { ClearBag } from "./ClearBag";

export const metadata: Metadata = { title: "Order placed", robots: { index: false } };

export default function SuccessPage() {
  return (
    <div data-tone="light" className="gutter flex min-h-[80vh] flex-col justify-center bg-bone pb-24 pt-14">
      <ClearBag />
      <h1 className="display text-[3.5rem] md:text-[6rem]">Thank you.</h1>
      <p className="mt-6 max-w-[44ch] text-lg">
        Your payment went through and your order is in. If you have a question about it, get in touch and include the email you checked out with.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="button button-solid">
          Keep shopping
        </Link>
        <Link href="/contact" className="button">
          Contact us
        </Link>
      </div>
    </div>
  );
}
