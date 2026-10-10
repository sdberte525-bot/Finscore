import { NewsletterForm } from "@/components/site/NewsletterForm";

/** The homepage's main sign-up, the target of the announcement bar. */
export function FirstAccess({ storeOpen }: { storeOpen: boolean }) {
  return (
    <section id="first-access" className="gutter scroll-mt-28 bg-plaster py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-span-7">
          <p className="caps text-ash">{storeOpen ? "The list" : "Before anyone else"}</p>
          <h2 className="display mt-4 text-[3.5rem] md:text-[6rem]">{storeOpen ? "Hear it first." : "Get first access."}</h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-charcoal">
            {storeOpen
              ? "New drops and restocks go to the list before they’re announced anywhere else."
              : "The first drop goes to the list before it’s announced anywhere else. One email when it’s live, then only when there’s something new."}
          </p>
        </div>
        <div className="md:col-span-5">
          <NewsletterForm source="home" tone="light" cta={storeOpen ? "Join the list" : "Get first access"} done="You’re on the list. Watch your inbox." />
        </div>
      </div>
    </section>
  );
}
