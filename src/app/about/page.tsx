import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Swolvation makes vintage-inspired gym clothing that looks as good outside the gym as it does inside it, shaped by old-school bodybuilding and classic athleticwear.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
