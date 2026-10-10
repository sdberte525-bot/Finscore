import Link from "next/link";

/** Slim bar above the header: pre-launch it drives sign-ups, after launch it points at the drop. */
export function AnnouncementBar({ open }: { open: boolean }) {
  return (
    <div className="bg-ink text-bone">
      <Link
        href={open ? "/new-drop" : "/#first-access"}
        className="gutter flex min-h-9 items-center justify-center gap-3 py-2 text-center text-[0.75rem] font-medium uppercase tracking-[0.16em] hover:text-plaster"
      >
        <span>
          {open ? "The first drop is live" : <>The first drop<span className="hidden sm:inline"> is coming</span></>}
        </span>
        <span aria-hidden="true" className="text-stone">/</span>
        <span className="underline decoration-bone/40 underline-offset-4">{open ? "Shop now" : "Get first access"}</span>
      </Link>
    </div>
  );
}
