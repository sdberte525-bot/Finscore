"use client";

import Link from "next/link";
import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { campaign } from "@/data/campaign";
import { productImage } from "@/data/products";
import { useReveal } from "@/lib/useReveal";

const beliefs = [
  {
    title: "Strength",
    body: "Built slowly, one session at a time. Nobody hands it to you.",
  },
  {
    title: "Discipline",
    body: "Showing up on the days you don’t feel like it. Those days count the most.",
  },
  {
    title: "Faith",
    body: "The reason behind the work. It’s printed on our shirts because it’s part of why we train.",
  },
  {
    title: "Perseverance",
    body: "Falling short, then coming back for it. Every lifter knows the feeling.",
  },
];

export function AboutView() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      <section className="gutter bg-bone pb-16 pt-14 md:pb-24 md:pt-20">
        <p className="caps text-ash">Our story</p>
        <h1 className="display mt-4 max-w-[12ch] text-[3.75rem] sm:text-[5.5rem] lg:text-[8rem]">Strength has a purpose.</h1>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <p data-rise className="text-2xl leading-snug md:col-span-7 md:text-[2rem]">
            Swolvation is about the relationship between physical strength, mental discipline, faith and perseverance.
          </p>
          <p data-rise className="max-w-[44ch] text-lg leading-relaxed text-charcoal md:col-span-4 md:col-start-9">
            The gym is where we test ourselves physically. But what you build there, the patience, the stubbornness, the habit of
            getting back up, carries into everything else.
          </p>
        </div>
      </section>

      <section data-tone="dark" className="bg-ink text-bone">
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6">
            <EditorialImage
              image={campaign.aboutOpening}
              fallback={productImage("through-christ", "Back")}
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
          <div data-rise className="gutter flex flex-col justify-center py-16 md:col-span-6 md:py-20 lg:px-16">
            <h2 className="display text-[2.75rem] md:text-[4rem]">Why Swolvation</h2>
            <div className="mt-8 max-w-[48ch] space-y-5 text-lg leading-relaxed text-stone">
              <p>
                The name is two words pushed together: <em className="not-italic text-bone">swole</em>, gym slang for the size that
                comes from years of showing up, and <em className="not-italic text-bone">salvation</em>. There&rsquo;s a little humor
                in it. There&rsquo;s also something we mean.
              </p>
              <p>
                We&rsquo;re a new brand. We don&rsquo;t have decades of history to point to, just a clear idea of what we want to
                make and who we&rsquo;re making it for.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gutter bg-bone py-20 md:py-28">
        <h2 className="display text-[2.75rem] md:text-[4rem]">What we stand for</h2>
        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {beliefs.map((b) => (
            <div key={b.title} data-rise className="border-t-2 border-ink pt-5">
              <dt className="display text-[1.75rem]">{b.title}</dt>
              <dd className="mt-3 leading-relaxed text-charcoal">{b.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gutter bg-plaster py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <div data-rise className="md:col-span-6">
            <h2 className="display text-[2.75rem] md:text-[4rem]">The clothing</h2>
            <div className="mt-8 max-w-[50ch] space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                Our designs take their cues from vintage training gear: oversized cuts, faded black, distressed cream prints. A small
                logo sits on the front. The back carries the message: gothic crosses and artwork built around a verse.
              </p>
              <p>
                We want them to feel as right on a rest day as they do under a barbell. Clothes with a point of view, not slogans for
                the sake of it.
              </p>
            </div>
          </div>
          <figure className="md:col-span-5 md:col-start-8">
            <EditorialImage
              image={campaign.aboutInspiration}
              fallback={productImage("strong-courageous", "Back print")}
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 92vw"
            />
          </figure>
        </div>
      </section>

      <section data-tone="dark" className="gutter bg-charcoal py-24 text-bone md:py-32">
        <p data-rise className="display max-w-[16ch] text-[3rem] sm:text-[4.5rem] lg:text-[6rem]">
          For anyone who keeps showing up.
        </p>
        <div data-rise className="mt-12 flex flex-wrap gap-3">
          <Link href="/new-drop" className="button button-light">
            Shop the first drop
          </Link>
          <Link href="/contact" className="button border-bone/40 text-bone hover:border-bone">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
