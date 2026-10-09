import Link from "next/link";
import { site } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Long sleeves", href: "/shop?category=long-sleeve" },
      { label: "Tees", href: "/shop?category=tee" },
      { label: "Bag", href: "/bag" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping and returns", href: "/info/shipping-returns" },
      { label: "Size guide", href: "/info/size-guide" },
      { label: "Contact", href: "/info/contact" },
    ],
  },
  {
    title: "Follow",
    links: site.social.map((s) => ({ label: s.label, href: s.href })),
  },
];

export function Footer() {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-ink text-bone">
      <div className="gutter pb-10 pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="fraktur text-[2.75rem] md:text-4xl">Hear about the next drop</h2>
            <p className="mt-5 max-w-[38ch] text-stone">
              Sign up and you&rsquo;ll hear about new pieces before they&rsquo;re posted anywhere else.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm text-stone">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-sm">
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
            <div>
              <h3 className="text-sm text-stone">Contact</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${site.email.general}`} className="link-underline break-words">
                    {site.email.general}
                  </a>
                </li>
                <li className="text-stone">Replies within two working days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="gutter" aria-hidden="true">
        <p className="wordmark select-none whitespace-nowrap text-center text-[11.4vw] leading-none tracking-[0.06em] text-bone/[0.09]">
          Swolvation
        </p>
      </div>

      <div className="gutter flex flex-col gap-3 border-t border-bone/10 py-8 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. {site.tagline}
        </p>
        <p>Heavyweight gym clothing with scripture prints.</p>
      </div>
    </footer>
  );
}
