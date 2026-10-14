import { person } from "@/data/profile";

export function Footer() {
  return (
    <footer className="on-dark bg-navy-deep text-steel-light">
      <div className="mx-auto flex max-w-[78rem] flex-col gap-4 px-5 py-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          &copy; {new Date().getFullYear()} {person.name}
        </p>
        <a href="#top" className="link-draw self-start text-paper/80 hover:text-paper sm:self-auto">
          Back to top
        </a>
      </div>
    </footer>
  );
}
