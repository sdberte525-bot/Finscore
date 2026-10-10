import Link from "next/link";

const helpLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns and exchanges", href: "/returns" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Contact us", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
];

/** Shared frame for customer-information pages: title, intro, and a side menu of the other help pages. */
export function InfoLayout({
  current,
  title,
  intro,
  updated,
  children,
}: {
  current: string;
  title: string;
  intro?: React.ReactNode;
  /** e.g. "Draft, to be finalized before launch" */
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-24 pt-12 md:pb-32 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <aside className="order-last lg:order-first lg:col-span-3">
          <nav aria-label="Customer information" className="lg:sticky lg:top-28">
            <h2 className="label">Help</h2>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={l.href === current ? "page" : undefined}
                    className={`inline-block py-1.5 ${l.href === current ? "text-ink underline underline-offset-4" : "text-ash hover:text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="lg:col-span-7 lg:col-start-5">
          <h1 className="display text-[3rem] md:text-[4.25rem]">{title}</h1>
          {updated ? <p className="mt-4 text-sm text-ash">{updated}</p> : null}
          {intro ? <div className="mt-6 max-w-[58ch] text-lg leading-relaxed text-charcoal">{intro}</div> : null}
          <div className="mt-14 space-y-14">{children}</div>
        </article>
      </div>
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink/15 pt-8">
      <h2 className="display text-[1.875rem] md:text-[2.25rem]">{title}</h2>
      <div className="prose-body mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-charcoal">{children}</div>
    </section>
  );
}
