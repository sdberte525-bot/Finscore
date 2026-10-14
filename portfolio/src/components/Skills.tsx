import { skills } from "@/data/profile";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" lede="Methods and tools used across coursework, teaching and professional roles.">
      <div>
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-x-10 gap-y-4 border-t border-rule py-8 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr]"
            data-reveal
          >
            <h3 className="display text-xl leading-snug">{group.category}</h3>
            <ul className="gap-x-10 text-charcoal/90 sm:columns-2">
              {group.items.map((item) => (
                <li key={item} className="break-inside-avoid pb-2.5 text-[0.98rem] leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
