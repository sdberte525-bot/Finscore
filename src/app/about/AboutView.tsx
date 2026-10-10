"use client";

import Link from "next/link";
import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { campaign } from "@/data/campaign";
import { productImage } from "@/data/products";
import { useReveal } from "@/lib/useReveal";

const principles = [
  {
    title: "Designed for the whole day",
    body: "Pieces that move from a morning session to everything after it without looking like gym kit.",
  },
  {
    title: "Graphics with restraint",
    body: "The statement goes on the back. The front stays quiet: a small mark and the wordmark.",
  },
  {
    title: "Rooted in real gym culture",
    body: "Our references come from the history of the sport and the people in it, not from this season's trends.",
  },
  {
    title: "A sense of humor, used sparingly",
    body: "The name is a wink. Everything else is made to be taken seriously.",
  },
];

export function AboutView() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      <section data-tone="light" className="gutter bg-bone pb-20 pt-36 md:pb-28 md:pt-48">
        <p className="label">About Swolvation</p>
        <h1 className="display mt-5 max-w-[14ch] text-[3.25rem] md:text-[6.5rem] md:leading-[0.98]">
          Made for the gym. Worn everywhere else.
        </h1>
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <p data-rise className="display text-[1.75rem] leading-[1.25] md:col-span-7 md:text-[2.375rem]">
            Swolvation was created from a simple idea: gym clothing should look just as good outside the gym as it does
            inside it.
          </p>
          <p data-rise className="max-w-[44ch] text-lg leading-relaxed text-charcoal md:col-span-4 md:col-start-9 md:pt-3">
            Inspired by the character of old-school bodybuilding and the timeless appeal of vintage athleticwear, we bring a
            fresh perspective to everyday training clothes.
          </p>
        </div>
      </section>

      <section data-tone="light" className="gutter bg-bone pb-24 md:pb-36">
        <EditorialImage
          image={campaign.aboutOpening}
          fallback={productImage("strong-courageous", "Back print")}
          aspect={campaign.aboutOpening ? "aspect-[16/9]" : "aspect-[680/580] md:mx-auto md:max-w-[680px]"}
          sizes={campaign.aboutOpening ? "100vw" : "(min-width: 768px) 680px, 92vw"}
          priority
        />
      </section>

      <section data-tone="light" className="gutter bg-bone pb-24 md:pb-40">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div data-rise className="md:col-span-5">
            <h2 className="display text-[2.5rem] md:text-[3.5rem]">The inspiration</h2>
            <div className="prose-body mt-8 max-w-[52ch] text-lg leading-relaxed text-charcoal">
              <p>
                Old-school bodybuilding had a look of its own. Photographs taped to gym walls, plates worn smooth from use,
                cotton tees faded by sun and sweat, lettering that was bold without being loud. It came from people who
                trained because they loved it, long before gym clothing was a category of its own.
              </p>
              <p>
                That spirit is where Swolvation starts. We look back at the shapes, graphics and attitude of classic gym
                culture and carry them forward into clothes that make sense today.
              </p>
            </div>
          </div>
          <figure className="md:col-span-5 md:col-start-8">
            <EditorialImage
              image={campaign.aboutInspiration}
              fallback={productImage("though-i-fall", "Back print")}
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 92vw"
            />
          </figure>
        </div>
      </section>

      <section data-tone="light" className="gutter bg-plaster py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div data-rise className="md:col-span-5">
            <h2 className="display text-[2.5rem] md:text-[3.5rem]">Our design philosophy</h2>
          </div>
          <div data-rise className="prose-body max-w-[54ch] text-lg leading-relaxed text-charcoal md:col-span-6 md:col-start-7">
            <p>
              Our approach is simple. Thoughtful designs, classic influences, and clothing made to become part of your
              everyday rotation.
            </p>
            <p>
              We believe the best gym clothing doesn&rsquo;t need to shout for attention. It speaks through the details: where
              a print sits, a color you can wear with anything, a shape you reach for without thinking about it.
            </p>
          </div>
        </div>
      </section>

      <section data-tone="light" className="gutter bg-bone py-24 md:py-36">
        <h2 className="display text-[2.5rem] md:text-[3.5rem]">What makes Swolvation different</h2>
        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} data-rise className="border-t border-ink/20 pt-6">
              <dt className="text-lg">{p.title}</dt>
              <dd className="mt-3 leading-relaxed text-ash">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section data-tone="light" className="gutter bg-bone pb-24 md:pb-36">
        <div className="grid gap-10 border-t border-ink/15 pt-16 md:grid-cols-12 md:gap-8">
          <h2 className="display text-[2.5rem] md:col-span-5 md:text-[3.5rem]">About the name</h2>
          <div className="prose-body max-w-[54ch] text-lg leading-relaxed text-charcoal md:col-span-6 md:col-start-7">
            <p>
              <em className="display-italic text-[1.25em]">Swol</em> is gym slang for big, the kind that comes from years of
              showing up. <em className="display-italic text-[1.25em]">Salvation</em> means rescue, and for a lot of people
              that is exactly what training is.
            </p>
            <p>Put the two together and you get a name with a little humor in it, on clothes that are made with care.</p>
          </div>
        </div>
      </section>

      <section data-tone="dark" className="gutter bg-ink py-28 text-bone md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <p data-rise className="display text-[2.25rem] leading-[1.15] md:text-[3.75rem]">
            Swolvation is for those who appreciate the culture, enjoy the process, and carry that identity beyond the gym.
          </p>
          <div data-rise className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="button button-light">
              Discover the collection
            </Link>
            <Link href="/contact" className="button border-bone/40 text-bone hover:border-bone">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
