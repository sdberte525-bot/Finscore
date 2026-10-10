import Link from "next/link";
import { business } from "@/data/business";
import { NewsletterForm } from "./NewsletterForm";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Long sleeves", href: "/shop?category=long-sleeve" },
      { label: "Tees", href: "/shop?category=tee" },
      { label: "Your bag", href: "/bag" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns and exchanges", href: "/returns" },
      { label: "Size guide", href: "/size-guide" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms and conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  const allColumns = business.social.length > 0 ? [...columns, { title: "Follow", links: business.social }] : columns;

  return (
    <footer data-tone="dark" className="relative overflow-hidden border-t border-bone/10 bg-ink text-bone">
      <div className="gutter pb-12 pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-[2.5rem] md:text-[3.25rem]">Hear about new pieces first</h2>
            <p className="mt-4 max-w-[40ch] text-stone">Occasional emails about new releases and restocks. Nothing else.</p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {allColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm text-stone">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-[0.9375rem]">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("http") ? (
                        <a href={link.href} className="link-underline" target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="link-underline">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="gutter" aria-hidden="true">
        <p className="wordmark select-none whitespace-nowrap text-center text-[10.6vw] leading-none tracking-[0.08em] text-bone/[0.08]">
          Swolvation
        </p>
      </div>

      <div className="gutter flex flex-col gap-3 border-t border-bone/10 py-8 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {business.legalName ?? business.name}
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          {business.email ? (
            <a href={`mailto:${business.email}`} className="link-underline">
              {business.email}
            </a>
          ) : null}
          <span>{business.tagline}</span>
        </p>
      </div>
    </footer>
  );
}
