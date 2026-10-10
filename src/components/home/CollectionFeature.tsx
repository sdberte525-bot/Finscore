"use client";

import Link from "next/link";
import { useRef } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import type { CampaignImage } from "@/data/campaign";
import type { ProductImage } from "@/lib/commerce/types";
import { useReveal } from "@/lib/useReveal";

/** Campaign-style feature: one oversized photograph, one detail, minimal copy. */
export function CollectionFeature({ campaignImage, lead, detail }: { campaignImage: CampaignImage | null; lead: ProductImage; detail: ProductImage }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} data-tone="dark" className="bg-ink text-bone">
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-7">
          <EditorialImage image={campaignImage} fallback={lead} aspect="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[46rem]" sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
        <div className="gutter flex flex-col justify-between gap-14 py-16 md:col-span-5 md:py-20 lg:px-16">
          <div data-rise>
            <h2 className="display text-[3.25rem] md:text-[4.5rem]">More than what you wear.</h2>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-stone">
              Made for those who keep showing up. In the gym, in life, and through every challenge.
            </p>
            <div className="mt-10">
              <Link href="/shop" className="button button-light">
                Shop the collection
              </Link>
            </div>
          </div>
          <figure data-rise className="max-w-sm">
            <EditorialImage image={null} fallback={detail} aspect="aspect-square" sizes="(min-width: 768px) 384px, 92vw" />
            <figcaption className="mt-3 text-sm text-stone">Distressed cream print, front logo</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
