import { research } from "@/data/research";
import { ExternalIcon } from "./Icons";
import { Section } from "./Section";

/** Renders only when research entries exist in src/data/research.ts. */
export function Research() {
  if (research.length === 0) return null;
  return (
    <Section id="research" title="Research" lede="Notes, models and dashboards.">
      <ul>
        {research.map((item) => {
          const external = /^https?:\/\//.test(item.href);
          return (
            <li key={item.title} className="border-t border-rule py-10 first:border-t-0 first:pt-0" data-reveal>
              <p className="flex flex-wrap gap-x-5 text-sm text-slate">
                <span className="text-steel">{item.type}</span>
                <span className="figures">{item.date}</span>
              </p>
              <h3 className="display mt-2 text-[1.75rem] leading-tight">{item.title}</h3>
              <p className="mt-4 max-w-[38rem] text-charcoal/90">{item.summary}</p>
              <a
                href={item.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
              >
                <span className="link-draw">{item.linkLabel}</span>
                {external && <ExternalIcon className="size-3.5 text-steel" />}
                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
