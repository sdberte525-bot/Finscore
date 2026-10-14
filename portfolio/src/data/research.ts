// Research notes, models and dashboards. The Research section and its navigation
// link appear only once this list has at least one entry, so nothing is shown
// until real work is published. See README.md for how to add an entry.

export type ResearchItem = {
  title: string;
  /** For example "Fixed income research", "Python model", "Macro dashboard". */
  type: string;
  /** Month and year completed, for example "Mar 2027". */
  date: string;
  summary: string;
  /** A PDF in /public/research, a GitHub repository, or a hosted dashboard. */
  href: string;
  /** Short label for the link, for example "Read the note (PDF)" or "View code on GitHub". */
  linkLabel: string;
};

export const research: ResearchItem[] = [];
