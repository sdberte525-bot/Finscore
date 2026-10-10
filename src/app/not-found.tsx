import Link from "next/link";

export default function NotFound() {
  return (
    <div data-tone="light" className="gutter flex min-h-[80vh] flex-col justify-center bg-bone pb-24 pt-32">
      <h1 className="display text-[3.5rem] md:text-[6rem]">Missed rep.</h1>
      <p className="mt-6 max-w-[40ch] text-lg">This page doesn&rsquo;t exist. It may have moved, or the link has a typo.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="button button-solid">
          Shop the collection
        </Link>
        <Link href="/" className="button">
          Go home
        </Link>
      </div>
    </div>
  );
}
