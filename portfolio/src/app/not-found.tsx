import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[100svh] max-w-[78rem] flex-col justify-center px-5 sm:px-8 lg:px-12">
      <p className="text-sm text-slate">Page not found</p>
      <h1 className="display mt-4 text-[3rem] leading-none sm:text-[4.5rem]">This page doesn&rsquo;t exist.</h1>
      <p className="mt-6 max-w-md text-charcoal/85">The address may be mistyped, or the page may have moved.</p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 w-fit items-center bg-navy px-7 text-sm font-medium text-paper transition-colors hover:bg-navy-deep"
      >
        Go to the home page
      </Link>
    </main>
  );
}
