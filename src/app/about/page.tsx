import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "Our story",
  description: "Swolvation is a new gymwear brand built on strength, discipline, faith and perseverance, with vintage-inspired clothing and meaningful designs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
