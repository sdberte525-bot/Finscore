"use client";

import Link from "next/link";
import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import type { CampaignImage } from "@/data/campaign";
import type { ProductImage } from "@/lib/commerce/types";
import { useReveal } from "@/lib/useReveal";

export function OurStory({ campaignImage, image }: { campaignImage: CampaignImage | null; image: ProductImage }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="story" className="gutter scroll-mt-24 bg-bone py-20 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-5">
          <EditorialImage image={campaignImage} fallback={image} aspect="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 92vw" />
        </figure>
        <div data-rise className="md:col-span-6 md:col-start-7">
          <p className="caps text-ash">Our story</p>
          <h2 className="display mt-4 text-[3.25rem] md:text-[5rem]">Strength has a purpose.</h2>
          <div className="mt-8 max-w-[52ch] space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Swolvation brings together two things: the discipline of training and the faith that gives it meaning. The gym is where you learn to keep going when it gets hard. That lesson doesn&rsquo;t stay in the gym.
            </p>
            <p>
              Our clothing carries that idea. Old-school training culture, gothic artwork and scripture, on oversized pieces made to be worn
              through every kind of day.
            </p>
          </div>
          <Link href="/about" className="button button-solid mt-10">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
