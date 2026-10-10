/** Marks a detail that hasn't been confirmed yet, so the site never guesses. */
export function Pending({ children = "To be confirmed before launch." }: { children?: React.ReactNode }) {
  return <span className="italic text-ash">{children}</span>;
}
