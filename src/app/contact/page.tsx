import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout } from "@/components/site/InfoLayout";
import { business } from "@/data/business";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about an order, sizing, returns or anything else? Send Swolvation a message.",
  alternates: { canonical: "/contact" },
};

const shortcuts = [
  { title: "Shipping", body: "Where we ship and how long it takes.", href: "/shipping" },
  { title: "Sizing", body: "Measurements and how to find your fit.", href: "/size-guide" },
  { title: "Returns and exchanges", body: "How to send something back or swap a size.", href: "/returns" },
  { title: "FAQ", body: "Answers to the questions we hear most.", href: "/faq" },
];

export default function ContactPage() {
  return (
    <InfoLayout
      current="/contact"
      title="Contact us"
      intro={
        <p>
          Questions about an order, sizing, or anything else? Send us a message and we&rsquo;ll get back to you.
          {business.email ? (
            <>
              {" "}
              You can also email{" "}
              <a href={`mailto:${business.email}`} className="underline underline-offset-4">
                {business.email}
              </a>
              .
            </>
          ) : null}
        </p>
      }
    >
      <section aria-labelledby="quick-answers">
        <h2 id="quick-answers" className="label">
          You might find a quick answer here
        </h2>
        <ul className="mt-5 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {shortcuts.map((s) => (
            <li key={s.href} className="bg-bone">
              <Link href={s.href} className="group block h-full p-6 transition-colors hover:bg-plaster/60">
                <span className="block text-lg">{s.title}</span>
                <span className="mt-1 block text-[0.9375rem] text-ash">{s.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="send-message" className="border-t border-ink/15 pt-10">
        <h2 id="send-message" className="display text-[2.25rem] md:text-[2.75rem]">
          Send a message
        </h2>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </InfoLayout>
  );
}
