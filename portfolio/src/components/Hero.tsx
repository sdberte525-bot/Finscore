import Image from "next/image";
import headshot from "@/assets/headshot.jpg";
import { heroFacts, person } from "@/data/profile";

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative">
      <div className="mx-auto grid max-w-[78rem] px-5 pt-28 pb-20 sm:px-8 sm:pt-36 md:grid-cols-12 md:gap-x-8 lg:min-h-[100svh] lg:content-center lg:gap-x-12 lg:px-12 lg:pt-28 lg:pb-32">
        {/* Name and disciplines */}
        <div className="md:col-span-12 lg:col-span-7 lg:row-start-1 lg:self-end">
          {/* Each item carries its divider on the left; the shifted list and clipped wrapper hide
              the divider that would otherwise start a wrapped line. */}
          <div className="hero-in overflow-hidden" style={delay(100)}>
            <ul className="-ml-7 flex flex-wrap gap-y-1 text-sm text-slate">
              {person.disciplines.map((discipline) => (
                <li key={discipline} className="relative pl-7">
                  <span aria-hidden="true" className="absolute top-1/2 left-3.5 h-3.5 w-px -translate-y-1/2 bg-steel/45" />
                  {discipline}
                </li>
              ))}
            </ul>
          </div>
          <h1
            className="hero-in display mt-5 text-[3.25rem] leading-[0.98] tracking-[-0.025em] sm:text-[4.5rem] xl:text-[5.5rem]"
            style={delay(200)}
          >
            {person.name}
          </h1>
        </div>

        {/* Portrait */}
        <div className="mt-12 mb-4 sm:mt-14 md:col-span-5 md:col-start-8 md:row-start-2 md:mt-12 md:mb-0 lg:row-span-2 lg:row-start-1 lg:my-0 lg:self-center">
          <figure className="relative mr-4 max-w-[22rem] sm:mr-6 sm:max-w-[25rem] md:ml-auto lg:max-w-[26.5rem]">
            <div
              aria-hidden="true"
              className="panel-in absolute -right-4 -bottom-4 h-full w-full bg-navy sm:-right-6 sm:-bottom-6"
            />
            <div className="portrait-in relative aspect-[4/5] overflow-hidden bg-[#6a9ccc]">
              <Image
                src={headshot}
                alt="Portrait of Salvatore Berte in a navy suit and tie"
                preload
                fetchPriority="high"
                quality={85}
                sizes="(min-width: 1024px) 424px, (min-width: 768px) 36vw, (min-width: 640px) 400px, 88vw"
                className="h-full w-full object-cover"
              />
              {/* Deepens the studio backdrop toward the navy palette; the face stays untouched. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_44%,transparent_55%,rgba(20,38,61,0.42)_100%)] mix-blend-multiply"
              />
            </div>
          </figure>
        </div>

        {/* Statement, introduction and actions */}
        <div className="mt-10 md:col-span-7 md:row-start-2 md:mt-12 lg:mt-8 lg:self-start">
          <p
            className="hero-in display max-w-xl text-[1.75rem] leading-[1.18] text-charcoal sm:text-[2.125rem]"
            style={delay(320)}
          >
            {person.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="hero-in mt-6 max-w-[36rem] text-base text-charcoal/85 sm:text-lg" style={delay(440)}>
            {person.intro}
          </p>

          <div className="hero-in mt-9 flex flex-wrap gap-3" style={delay(560)}>
            <a
              href="#experience"
              className="inline-flex h-12 items-center bg-navy px-7 text-sm font-medium text-paper transition-colors duration-300 hover:bg-navy-deep"
            >
              View experience
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center border border-navy/25 px-7 text-sm font-medium text-navy transition-colors duration-300 hover:border-navy hover:bg-navy/[0.03]"
            >
              Get in touch
            </a>
          </div>

          <dl className="hero-in mt-12 grid gap-5 border-t border-rule pt-5 sm:grid-cols-3 sm:gap-8 md:grid-cols-1 md:gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-8" style={delay(680)}>
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-slate">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-charcoal">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        className="hero-in group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs text-slate transition-colors hover:text-navy [@media(min-width:64rem)_and_(min-height:50rem)]:flex"
        style={delay(1100)}
      >
        <span>Scroll</span>
        <span aria-hidden="true" className="scroll-cue-line relative block h-10 w-px overflow-hidden bg-rule" />
        <span className="sr-only">to the About section</span>
      </a>
    </section>
  );
}
