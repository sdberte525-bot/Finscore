import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout } from "@/components/site/InfoLayout";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";
import { getCatalog } from "@/lib/commerce";
import { checkoutMethod } from "@/lib/commerce/checkout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Swolvation sizing, shipping, returns, care and checkout.",
  alternates: { canonical: "/faq" },
};

export const dynamic = "force-dynamic";

const ORDER = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export default async function FaqPage() {
  const products = await getCatalog();
  const sizes = [...new Set(products.flatMap((p) => p.variants.map((v) => v.size)))].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  const method = checkoutMethod();
  const { shipping, returns } = business;

  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "How do Swolvation pieces fit?",
      a: (
        <p>
          Fit notes for each piece are on its product page, and measurements are in the{" "}
          <Link href="/size-guide" className="underline underline-offset-4">
            size guide
          </Link>
          . If you&rsquo;re between sizes,{" "}
          <Link href="/contact" className="underline underline-offset-4">
            send us a message
          </Link>{" "}
          and we&rsquo;ll help you choose.
        </p>
      ),
    },
    {
      q: "What sizes do you offer?",
      a: <p>The current collection comes in {sizes.length > 1 ? `${sizes[0]} to ${sizes[sizes.length - 1]}` : sizes[0]}. Availability by size is shown on each product page.</p>,
    },
    {
      q: "Where do you ship?",
      a: <p>{shipping.regions ? `We currently ship to ${shipping.regions}.` : <Pending>Shipping regions will be confirmed before launch.</Pending>}</p>,
    },
    {
      q: "How long will my order take to arrive?",
      a: (
        <p>
          {shipping.processingTime || shipping.deliveryEstimate ? (
            <>
              {shipping.processingTime ? `Orders ship within ${shipping.processingTime}. ` : null}
              {shipping.deliveryEstimate ? `Delivery usually takes ${shipping.deliveryEstimate}.` : null}
            </>
          ) : (
            <Pending>Processing and delivery times will be confirmed before launch.</Pending>
          )}{" "}
          <Link href="/shipping" className="underline underline-offset-4">
            Shipping details
          </Link>
        </p>
      ),
    },
    {
      q: "Can I return or exchange something?",
      a: (
        <p>
          {returns.windowDays ? `Yes, within ${returns.windowDays} days of delivery.` : <Pending>Return and exchange terms will be confirmed before launch.</Pending>}{" "}
          <Link href="/returns" className="underline underline-offset-4">
            Returns and exchanges
          </Link>
        </p>
      ),
    },
    {
      q: "How should I care for my clothes?",
      a: <p>Care instructions are listed on each product page, under Care.</p>,
    },
    {
      q: "Is checkout secure?",
      a:
        method === null ? (
          <p>Online checkout isn&rsquo;t open yet. When it is, payment will be handled on a secure hosted checkout page.</p>
        ) : (
          <p>
            Payment is handled on {method === "shopify" ? "Shopify" : "Stripe"}&rsquo;s secure hosted checkout page. Your card details go
            straight to them; Swolvation never sees or stores your card number.
          </p>
        ),
    },
    {
      q: "Can I change or cancel my order?",
      a: (
        <p>
          <Link href="/contact" className="underline underline-offset-4">
            Contact us
          </Link>{" "}
          as soon as possible with your order number and we&rsquo;ll see what we can do before it ships.
        </p>
      ),
    },
    {
      q: "Are you on social media?",
      a:
        business.social.length > 0 ? (
          <p>
            Yes:{" "}
            {business.social.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? ", " : ""}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {s.label}
                </a>
              </span>
            ))}
            .
          </p>
        ) : (
          <p>Not yet. The best way to hear about new pieces is the email signup at the bottom of every page.</p>
        ),
    },
  ];

  return (
    <InfoLayout current="/faq" title="Frequently asked questions" intro={<p>Can&rsquo;t find what you need? <Link href="/contact" className="underline underline-offset-4">Get in touch</Link>.</p>}>
      <div className="divide-y divide-ink/15 border-y border-ink/15">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="text-2xl leading-none text-ash transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="max-w-[60ch] pb-6 text-[1.0625rem] leading-relaxed text-charcoal">{f.a}</div>
          </details>
        ))}
      </div>
    </InfoLayout>
  );
}
