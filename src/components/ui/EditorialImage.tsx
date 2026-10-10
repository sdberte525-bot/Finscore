import Image from "next/image";
import type { CampaignImage } from "@/data/campaign";
import type { ProductImage } from "@/lib/commerce/types";

/**
 * A photograph in an editorial frame. Without a campaign photo it shows the
 * fallback (a real product render), and without either, a quiet placeholder
 * that says photography is coming. The frame keeps its aspect ratio either way,
 * so layouts don't shift when real photography is dropped in.
 */
export function EditorialImage({
  image: campaignImage,
  fallback,
  position = "center",
  aspect,
  sizes,
  priority = false,
  tone = "light",
  className = "",
}: {
  image: CampaignImage | null;
  /** A product image to show until campaign photography exists. */
  fallback?: ProductImage;
  /** object-position for the fallback crop, e.g. "50% 30%". */
  position?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". */
  aspect: string;
  sizes: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const image = campaignImage ?? fallback ?? null;
  // Cut-out garments are shown whole on the studio backdrop; photos and close-ups fill the frame.
  const contain = !campaignImage && fallback?.fit !== "cover";
  return (
    <div data-reveal className={`relative overflow-hidden ${aspect} ${contain ? "bg-studio" : tone === "dark" ? "bg-charcoal" : "bg-plaster"} ${className}`}>
      {image && contain ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-contain p-[6%]" />
      ) : image ? (
        <div data-parallax className="absolute -inset-y-[6%] inset-x-0">
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: campaignImage ? undefined : position }} />
        </div>
      ) : (
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center ${tone === "dark" ? "text-stone" : "text-ash"}`}>
          <svg viewBox="0 0 40 64" aria-hidden="true" className="h-12 w-8 opacity-40">
            <path d="M20 2v60M6 18h28" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="square" />
            <path d="M20 2l-3 5M20 2l3 5M6 18l5-3M6 18l5 3M34 18l-5-3M34 18l-5 3M20 62l-3-5M20 62l3-5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
          <p className="text-sm">Campaign photography coming soon</p>
        </div>
      )}
    </div>
  );
}
