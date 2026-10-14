type SectionProps = {
  id: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
};

/**
 * Two-column section: the heading holds the left column (sticky on wide screens)
 * and the content fills the right.
 */
export function Section({ id, title, lede, tone = "light", className = "", children }: SectionProps) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${dark ? "on-dark bg-navy text-paper" : ""} ${className}`}
    >
      <div className="mx-auto grid max-w-[78rem] gap-x-12 gap-y-10 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:px-12">
        <header className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-32">
            <span aria-hidden="true" className={`mb-7 block h-px w-12 ${dark ? "bg-steel-light/60" : "bg-steel"}`} />
            <h2
              id={`${id}-title`}
              className={`display text-3xl md:text-[3.25rem] md:leading-[1.04] ${dark ? "text-paper" : ""}`}
            >
              {title}
            </h2>
            {lede && (
              <p className={`mt-5 max-w-sm text-base ${dark ? "text-steel-light" : "text-slate"}`}>{lede}</p>
            )}
          </div>
        </header>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
