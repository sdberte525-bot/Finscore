import Image from "next/image";
import type { Collaboration, CommunityPost } from "@/data/community";
import { site } from "@/data/site";

const instagram = site.social.find((s) => s.label === "Instagram")!;

export function Community({ posts, collaborations }: { posts: CommunityPost[]; collaborations: Collaboration[] }) {
  return (
    <section id="community" data-tone="light" className="gutter scroll-mt-20 bg-plaster py-32 md:py-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="fraktur text-[3.25rem] md:text-[5.5rem]">The Congregation</h2>
          <p className="mt-6 max-w-[44ch] text-lg text-charcoal">
            Lifters, garage gyms, early risers, and anyone who still writes their sets down. If you train in Swolvation,
            we want to see it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="button button-solid">
              Follow {instagram.handle}
            </a>
            <a href={`mailto:${site.email.community}?subject=Training%20photo`} className="button">
              Send us a photo
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {posts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.src}>
                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone/40">
                      <Image src={post.src} alt={post.alt} fill sizes="(min-width: 768px) 16vw, 46vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-2 text-xs text-ash">
                      {post.href ? (
                        <a href={post.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                          {post.credit}
                        </a>
                      ) : (
                        post.credit
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <div className="flex aspect-[4/3] flex-col justify-end border border-ink/20 p-6 md:p-9">
                <p className="fraktur text-[2.5rem] md:text-[3.75rem]">Your set here.</p>
                <p className="mt-3 max-w-[34ch] text-sm text-charcoal md:text-base">
                  This wall fills up with photos from people who train in Swolvation. It&rsquo;s waiting on the first one.
                </p>
              </div>
              <ol className="mt-8 grid gap-6 text-sm sm:grid-cols-3">
                {[
                  ["Train in it.", "Garage, commercial gym, park bars. Anywhere counts."],
                  [`Tag ${instagram.handle}.`, "Or use #swolvation, or email the photo to us."],
                  ["We ask first.", "Nothing goes on the wall without your permission."],
                ].map(([title, body], i) => (
                  <li key={title}>
                    <span className="tabular-nums text-ash">{i + 1}</span>
                    <p className="mt-2">{title}</p>
                    <p className="mt-1 text-ash">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-16 border-t border-ink/15 pt-8 md:mt-20">
            <h3 className="text-lg">Collaborations</h3>
            {collaborations.length > 0 ? (
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {collaborations.map((c) => (
                  <li key={c.name}>
                    <p>{c.href ? <a href={c.href} className="link-underline">{c.name}</a> : c.name}</p>
                    <p className="mt-1 text-sm text-ash">{c.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 max-w-[52ch] text-charcoal">
                We&rsquo;re open to working with gyms, coaches, and makers we&rsquo;d happily train next to. Write to{" "}
                <a href={`mailto:${site.email.collabs}`} className="underline underline-offset-4">
                  {site.email.collabs}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
