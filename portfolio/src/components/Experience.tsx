import { experience } from "@/data/profile";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      lede="Teaching, banking, wealth management and markets, most recent first."
    >
      <ol className="relative">
        {experience.map((role) => (
          <li
            key={`${role.organization}-${role.title}-${role.start}`}
            className="group relative grid gap-x-10 border-t border-rule py-10 first:border-t-0 first:pt-0 md:grid-cols-[10rem_1fr] md:py-12"
            data-reveal
          >
            <div className="mb-4 md:mb-0">
              <p className="figures text-sm text-charcoal">
                <time>{role.start}</time>
                <span aria-hidden="true"> – </span>
                <span className="sr-only"> to </span>
                {role.current ? <span>{role.end}</span> : <time>{role.end}</time>}
              </p>
              <p className="mt-1 text-xs text-slate">{role.location}</p>
              {role.current && (
                <p className="mt-3 inline-flex items-center gap-2 text-xs text-steel">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-steel" />
                  Current role
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-steel">{role.organization}</p>
              <h3 className="display mt-1.5 text-[1.75rem] leading-tight">{role.title}</h3>
              {role.detail && <p className="mt-1.5 text-sm text-slate">{role.detail}</p>}
              <p className="mt-5 max-w-[38rem] text-charcoal">{role.summary}</p>
              <ul className="mt-5 max-w-[38rem] space-y-3">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-6 text-[0.98rem] leading-[1.65] text-charcoal/85">
                    <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-3 bg-steel/70" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {role.related && (
                <a href={role.related.href} className="link-draw mt-6 inline-block text-sm font-medium text-navy">
                  {role.related.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
