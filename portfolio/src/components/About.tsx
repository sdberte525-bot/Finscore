import { about } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div data-reveal>
        <p className="display max-w-2xl text-2xl leading-[1.3] text-navy md:text-[2.125rem] md:leading-[1.25]">
          {about.title}
        </p>
        <div className="mt-10 max-w-[38rem] space-y-6 text-charcoal/90">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-rule pt-8" data-reveal>
        <h3 className="font-sans text-sm font-medium text-navy">Areas of interest</h3>
        <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
          {about.interests.map((interest) => (
            <li key={interest} className="flex items-baseline gap-4 border-b border-rule py-3.5 text-charcoal">
              <span aria-hidden="true" className="relative -top-0.5 size-1.5 shrink-0 bg-steel" />
              {interest}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-slate">{about.personal}</p>
      </div>
    </Section>
  );
}
