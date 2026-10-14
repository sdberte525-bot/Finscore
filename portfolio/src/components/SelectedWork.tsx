import { deskFigures, selectedWork } from "@/data/profile";
import { Section } from "./Section";

function Meta({ context, period }: { context: string; period?: string }) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-steel-light">
      <span>{context}</span>
      {period && <span className="figures">{period}</span>}
    </p>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 flex gap-3 text-xs leading-relaxed text-steel-light">
      <span className="shrink-0 font-medium text-paper/80">Note</span>
      <span>{children}</span>
    </p>
  );
}

export function SelectedWork() {
  const { desk, challenge, fixedIncome } = selectedWork;
  return (
    <Section
      id="selected-work"
      tone="dark"
      title="Selected work"
      lede="Portfolio oversight, trading and fixed income: the parts of my experience closest to the work I want to do."
    >
      {/* Featured: trading desk */}
      <article aria-labelledby="desk-title" className="border-t border-steel-light/30 pt-8" data-reveal>
        <Meta context={desk.context} period={desk.period} />
        <h3 id="desk-title" className="display mt-3 text-[2rem] leading-tight text-paper md:text-[2.5rem]">
          {desk.title}
        </h3>
        <p className="mt-5 max-w-[40rem] text-paper/85">{desk.body}</p>

        <dl className="mt-10 grid border-y border-rule-dark sm:grid-cols-3">
          {deskFigures.map((figure, i) => (
            <div
              key={figure.label}
              className={`flex flex-col gap-2 py-6 sm:px-6 ${i > 0 ? "border-t border-rule-dark sm:border-t-0 sm:border-l" : "sm:pl-0"}`}
            >
              <dt className="order-2 text-sm leading-snug text-steel-light">{figure.label}</dt>
              <dd className="display figures order-1 text-[2.75rem] leading-none text-paper">{figure.value}</dd>
            </div>
          ))}
        </dl>
        <Note>{desk.note}</Note>
      </article>

      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-12">
        {/* Trading challenge */}
        <article aria-labelledby="challenge-title" className="border-t border-steel-light/30 pt-8" data-reveal>
          <Meta context={challenge.context} period={challenge.period} />
          <h3 id="challenge-title" className="display mt-3 text-[1.75rem] leading-tight text-paper">
            {challenge.title}
          </h3>
          <dl className="mt-6 flex flex-row-reverse items-baseline justify-end gap-4">
            <dt className="text-sm text-steel-light">{challenge.figure.label}</dt>
            <dd className="display figures text-[2.75rem] leading-none text-paper">{challenge.figure.value}</dd>
          </dl>
          <p className="mt-6 text-paper/85">{challenge.body}</p>
          <Note>{challenge.note}</Note>
        </article>

        {/* Fixed income */}
        <article
          aria-labelledby="fixed-income-title"
          className="border-t border-steel-light/30 pt-8"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <Meta context={fixedIncome.context} />
          <h3 id="fixed-income-title" className="display mt-3 text-[1.75rem] leading-tight text-paper">
            {fixedIncome.title}
          </h3>
          <p className="mt-6 text-paper/85">{fixedIncome.body}</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 text-sm text-paper">
            {fixedIncome.topics.map((topic) => (
              <li key={topic} className="border-b border-rule-dark py-2.5">
                {topic}
              </li>
            ))}
          </ul>
          <h4 className="mt-7 text-xs font-medium text-paper/80">Where this work happens</h4>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-steel-light">
            {fixedIncome.settings.map((setting) => (
              <li key={setting}>{setting}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
