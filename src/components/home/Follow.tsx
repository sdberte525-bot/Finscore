import Image from "next/image";
import { InstagramIcon, TikTokIcon } from "@/components/site/Icons";
import { business } from "@/data/business";
import { photos } from "@/data/media";

const TILES = [photos.knurling, photos.chalk, photos.dumbbells, photos.vintageGym];

/** Social follow block with campaign frames. Shown only when social accounts are configured. */
export function Follow() {
  if (business.social.length === 0) return null;
  const instagram = business.social.find((s) => s.icon === "instagram") ?? business.social[0];

  return (
    <section className="gutter bg-bone py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="caps text-ash">{instagram.handle}</p>
          <h2 className="display mt-4 text-[3.25rem] md:text-[5rem]">Follow the work.</h2>
        </div>
        <ul className="flex flex-wrap gap-3">
          {business.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="button gap-2.5">
                {s.icon === "instagram" ? <InstagramIcon /> : <TikTokIcon />}
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-2 md:mt-14 md:grid-cols-4 md:gap-3">
        {TILES.map((t) => (
          <li key={t.src}>
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden bg-charcoal" aria-label={`${t.alt}. Follow ${instagram.handle} on ${instagram.label}`}>
              <Image src={t.src} alt="" fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink/0 text-bone opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-ash">Frames from the first-drop campaign.</p>
    </section>
  );
}
