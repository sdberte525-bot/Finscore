import Link from "next/link";

export function ClosingStatement({ storeOpen }: { storeOpen: boolean }) {
  return (
    <section data-tone="dark" className="gutter border-b border-bone/10 bg-charcoal py-24 text-bone md:py-36">
      <h2 className="display text-[3.5rem] leading-[0.92] sm:text-[5.5rem] lg:text-[8rem]">
        <span className="block">Built to endure.</span>
        <span className="block text-stone">Made with purpose.</span>
      </h2>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href={storeOpen ? "/shop" : "/new-drop"} className="button button-light">
          {storeOpen ? "Shop now" : "See the first drop"}
        </Link>
        <Link href="/size-guide" className="caps link-underline py-2 text-stone hover:text-bone">
          Find your size
        </Link>
      </div>
    </section>
  );
}
