import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout, InfoSection } from "@/components/site/InfoLayout";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Where Swolvation ships, how long orders take, and what shipping costs.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  const s = business.shipping;
  const rows: [string, string | null][] = [
    ["Where we ship", s.regions],
    ["Processing time", s.processingTime],
    ["Delivery estimate", s.deliveryEstimate],
    ["Shipping rates", s.rates],
  ];

  return (
    <InfoLayout current="/shipping" title="Shipping" intro={<p>Everything you need to know about getting your order.</p>}>
      <InfoSection title="At a glance">
        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-ash">{label}</dt>
              <dd>{value ?? <Pending />}</dd>
            </div>
          ))}
        </dl>
        <p>Shipping costs are shown at checkout before you pay.</p>
      </InfoSection>

      <InfoSection title="Questions about an order">
        <p>
          If something about your delivery doesn&rsquo;t look right,{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact us
          </Link>{" "}
          with your order number and we&rsquo;ll look into it.
        </p>
      </InfoSection>
    </InfoLayout>
  );
}
