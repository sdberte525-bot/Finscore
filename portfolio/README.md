# Salvatore Berte — professional portfolio

A single-page site for Salvatore Berte: finance, applied economics and investment research.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. It has no other runtime dependencies. Motion is plain CSS plus one small IntersectionObserver, so there is no animation library to download.

This folder is a self-contained project. The repository root holds a separate app and is not affected by anything here.

## Preview locally

Requires Node.js 20.9 or later.

```bash
cd portfolio
npm install
npm run dev          # http://localhost:3000, with hot reload
```

To check the production build:

```bash
npm run build
npm start            # http://localhost:3000
npm run typecheck
```

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repository.
2. Set **Root Directory** to `portfolio`. Vercel detects Next.js; keep the default build settings.
3. Deploy.

Canonical links, the sitemap and social preview images use the production domain Vercel assigns automatically. If you add a custom domain (for example `salvatoreberte.com`), set the environment variable `NEXT_PUBLIC_SITE_URL=https://salvatoreberte.com` under **Settings → Environment Variables** and redeploy.

## Where things live

| What | Where |
| --- | --- |
| All site copy: bio, experience, selected work, education, certifications, skills, contact details | `src/data/profile.ts` |
| Future research notes, models and dashboards | `src/data/research.ts` |
| Page title, description, navigation | `src/lib/site.ts` |
| Colors, type scale, motion | `src/app/globals.css` |
| Headshot | `src/assets/headshot.jpg` |
| Downloadable résumé (no GPA) | `public/salvatore-berte-resume.pdf` |
| Social preview image and icons | `src/app/opengraph-image.jpg`, `twitter-image.jpg`, `icon.png`, `apple-icon.png`, `favicon.ico` |

Sections live in `src/components/`, one file each.

## Adding research or projects

The Research section and its navigation link stay hidden until there is at least one entry, so nothing appears unfinished. To publish one, add an object to the list in `src/data/research.ts`:

```ts
export const research: ResearchItem[] = [
  {
    title: "Title of the note or project",
    type: "Fixed income research", // or "Python model", "Macro dashboard"
    date: "Month Year",
    summary: "Two or three sentences on the question, the method and what you found.",
    href: "/research/file-name.pdf", // a PDF in public/research, or a GitHub or dashboard URL
    linkLabel: "Read the note (PDF)",
  },
];
```

Entries linking outside the site open in a new tab automatically.

## Updating the résumé

Before replacing `public/salvatore-berte-resume.pdf`, make sure the new file has no GPA. Delete the GPA from the Word document before exporting to PDF, then confirm:

```bash
pdftotext public/salvatore-berte-resume.pdf - | grep -i gpa   # should print nothing
```

## Design notes

- **Type:** Newsreader (editorial serif, optical sizes) for headings; IBM Plex Sans for text, with tabular figures for dates and numbers. Both are self-hosted at build time through `next/font`.
- **Color:** deep navy `#14263D`, charcoal `#222831`, warm white `#FAFAF8`, slate `#64748B` and a muted steel blue `#4F6D8A`. All text pairings meet WCAG AA.
- **Honesty conventions:** figures for student-managed and virtual portfolios carry a short note saying what they are, the way a research note carries disclosures. The CFA credential is labeled as candidacy.
- **Motion:** one load sequence in the hero and light fades as sections enter. All of it is turned off when the visitor's system asks for reduced motion, and content stays visible if JavaScript fails.

## Shareable page on claude.ai

A self-contained copy of the site is published as a private claude.ai artifact (shareable from its Share menu). It is generated from the production build, so rebuild it after content changes:

```bash
npm run build
python3 -I scripts/share-page/build_share.py . /tmp/share   # needs Pillow
```

This writes `index.html` (fonts from Google Fonts, headshot embedded) and the résumé PDF, ready to republish. The page offers the résumé through claude.ai's save dialog, and shows the email address as copyable text because email links may not open from inside claude.ai.
