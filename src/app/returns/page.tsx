import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout, InfoSection } from "@/components/site/InfoLayout";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Returns and exchanges",
  description: "How to return or exchange a Swolvation piece.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  const r = business.returns;
  const rows: [string, string | null][] = [
    ["Return window", r.windowDays ? `${r.windowDays} days from delivery` : null],
    ["Condition", r.condition],
    ["Exchanges", r.exchanges],
    ["Refunds", r.refunds],
  ];

  return (
    <InfoLayout current="/returns" title="Returns and exchanges" intro={<p>If something isn&rsquo;t right, here&rsquo;s how to send it back or swap it.</p>}>
      <InfoSection title="Our policy">
        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-ash">{label}</dt>
              <dd>{value ?? <Pending />}</dd>
            </div>
          ))}
        </dl>
      </InfoSection>

      <InfoSection title="How to start a return or exchange">
        <ol className="list-inside list-decimal space-y-3 marker:text-ash">
          <li>
            <Link href="/contact" className="underline underline-offset-4">
              Send us a message
            </Link>{" "}
            and choose &ldquo;Returns and exchanges&rdquo; as the topic.
          </li>
          <li>Include your order number and the item you&rsquo;d like to return or swap.</li>
          <li>We&rsquo;ll reply with the next steps.</li>
        </ol>
      </InfoSection>
    </InfoLayout>
  );
}
