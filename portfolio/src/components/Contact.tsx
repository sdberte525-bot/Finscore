import { person } from "@/data/profile";
import { CopyEmail } from "./CopyEmail";
import { DownloadIcon, ExternalIcon } from "./Icons";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark bg-navy text-paper">
      <div className="mx-auto max-w-[78rem] px-5 pt-24 pb-20 sm:px-8 md:pt-32 lg:px-12">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <span aria-hidden="true" className="mb-7 block h-px w-12 bg-steel-light/60" />
            <h2 id="contact-title" className="display text-[3.25rem] leading-[1] text-paper md:text-[5rem]">
              Let&rsquo;s connect.
            </h2>
            <p className="mt-7 max-w-[34rem] text-lg text-paper/85">
              I welcome opportunities to connect with professionals in investment research, asset management, fixed
              income, and financial markets.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${person.email}`}
                className="inline-flex h-12 items-center bg-paper px-7 text-sm font-medium text-navy transition-colors duration-300 hover:bg-white"
              >
                Email me
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 border border-paper/30 px-7 text-sm font-medium text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/5"
              >
                Connect on LinkedIn
                <ExternalIcon className="size-3.5 text-steel-light" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <dl
            className="self-end border-t border-rule-dark lg:col-span-4 lg:col-start-9"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="border-b border-rule-dark py-5">
              <dt className="text-xs text-steel-light">Email</dt>
              <dd className="mt-1.5 flex flex-col items-start gap-1.5">
                <a href={`mailto:${person.email}`} className="link-draw text-paper">
                  {person.email}
                </a>
                <CopyEmail email={person.email} />
              </dd>
            </div>
            <div className="border-b border-rule-dark py-5">
              <dt className="text-xs text-steel-light">LinkedIn</dt>
              <dd className="mt-1.5">
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw text-paper">
                  linkedin.com/in/salvatore-berte
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div className="border-b border-rule-dark py-5">
              <dt className="text-xs text-steel-light">Location</dt>
              <dd className="mt-1.5 text-paper">
                {person.location}
                <span className="block text-sm text-steel-light">{person.relocation}</span>
              </dd>
            </div>
            <div className="py-5">
              <dt className="text-xs text-steel-light">Résumé</dt>
              <dd className="mt-1.5">
                <a href={person.resume} download className="group inline-flex items-center gap-2 text-paper">
                  <DownloadIcon className="size-4 text-steel-light transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span className="link-draw">Download PDF</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
