import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout, InfoSection } from "@/components/site/InfoLayout";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms that apply when you use the Swolvation website and buy from us.",
  alternates: { canonical: "/terms" },
};

/*
 * Draft outline. Sections marked "to be confirmed" are business and legal
 * decisions: have the finished terms reviewed by a professional before launch.
 */
export default function TermsPage() {
  const owner = business.legalName ?? business.name;

  return (
    <InfoLayout
      current="/terms"
      title="Terms and conditions"
      updated="Draft. These terms will be reviewed and finalized before launch."
      intro={<p>These terms apply when you use this website or buy from {owner}.</p>}
    >
      <InfoSection title="Products and pricing">
        <p>
          We do our best to show every product, color and detail accurately, but screens vary and colors may look slightly different
          in person. Prices are shown in US dollars. Taxes and shipping are shown at checkout before you pay.
        </p>
      </InfoSection>

      <InfoSection title="Orders">
        <p>
          Your order is confirmed once payment goes through on the checkout page. The circumstances in which an order may be
          cancelled or refunded by us: <Pending />
        </p>
      </InfoSection>

      <InfoSection title="Shipping and returns">
        <p>
          Shipping and returns are covered by our{" "}
          <Link href="/shipping" className="underline underline-offset-4">
            shipping
          </Link>{" "}
          and{" "}
          <Link href="/returns" className="underline underline-offset-4">
            returns
          </Link>{" "}
          pages, which form part of these terms.
        </p>
      </InfoSection>

      <InfoSection title="Designs and content">
        <p>
          The Swolvation name, logo, artwork, product designs, photography and text on this site belong to {owner}. Please don&rsquo;t
          copy or reuse them without permission.
        </p>
      </InfoSection>

      <InfoSection title="Liability">
        <p>
          <Pending />
        </p>
      </InfoSection>

      <InfoSection title="Governing law">
        <p>These terms are governed by the laws of {business.jurisdiction ?? <Pending>[jurisdiction]</Pending>}.</p>
      </InfoSection>

      <InfoSection title="Contact">
        <p>
          Questions about these terms?{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </InfoSection>
    </InfoLayout>
  );
}
