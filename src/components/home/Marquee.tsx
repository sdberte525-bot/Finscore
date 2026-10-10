const ITEMS = ["Built through adversity", "The first drop", "Joshua 1:9", "Philippians 4:13", "Strength has a purpose", "@swolvation"];

/** A slow, continuous ticker band. Purely decorative, so it's hidden from screen readers. */
export function Marquee() {
  const run = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[1.5rem] md:px-8 md:text-[2rem]">{item}</span>
          <svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true" className="shrink-0 text-ash">
            <path d="M7 0v22M1 7h12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-ink/10 bg-bone py-4 text-ink md:py-5">
      <div className="marquee flex w-max">
        {run}
        {run}
      </div>
    </div>
  );
}
