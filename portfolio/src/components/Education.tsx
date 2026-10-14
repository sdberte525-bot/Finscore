import { credentials, education } from "@/data/profile";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education" className="border-t border-rule">
      {/* Subgrid keeps each school's heading, degree and coursework on shared rows. */}
      <div className="grid gap-y-14 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-x-12 md:gap-y-0">
        {education.map((school, i) => (
          <article
            key={school.name}
            aria-labelledby={`school-${i}`}
            className="border-t-2 border-navy pt-7 md:row-span-3 md:grid md:grid-rows-subgrid"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <div>
              <p className="figures text-sm text-steel">{school.date}</p>
              <h3 id={`school-${i}`} className="display mt-2 text-[2rem] leading-tight">
                {school.name}
              </h3>
              {school.division && <p className="mt-1 text-sm text-charcoal/85">{school.division}</p>}
              <p className="mt-0.5 text-sm text-slate">{school.location}</p>
            </div>

            <div className="mt-6">
              <p className="font-medium text-charcoal">{school.degree}</p>
              {school.field && <p className="mt-1 text-charcoal/85">{school.field}</p>}
            </div>

            <div className="mt-8">
              <h4 className="text-xs text-slate">Relevant coursework</h4>
              <ul className="mt-2 text-sm text-charcoal">
                {school.coursework.map((course) => (
                  <li key={course} className="border-b border-rule py-2.5">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20" data-reveal>
        <h3 className="display text-[1.75rem] leading-tight">Certifications</h3>
        <table className="mt-6 w-full text-left text-sm">
          <caption className="sr-only">Certifications and their status</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Credential</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((credential) => (
              <tr key={credential.name} className="border-t border-rule last:border-b">
                <th scope="row" className="py-4 pr-6 align-top font-normal">
                  <span className="block font-medium text-charcoal">{credential.name}</span>
                  {credential.issuer && <span className="mt-0.5 block text-slate">{credential.issuer}</span>}
                </th>
                <td className="py-4 text-right align-top">
                  {credential.status === "Candidate" ? (
                    <span className="inline-flex items-center gap-2 border border-steel/40 px-2.5 py-1 text-xs text-steel">
                      <span aria-hidden="true" className="size-1.5 rounded-full border border-steel" />
                      Candidate
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 text-xs text-charcoal/80">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-navy" />
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
