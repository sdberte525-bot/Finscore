import type { Metadata } from "next";
import Link from "next/link";
import { SizeChart } from "@/components/product/SizeChart";
import { InfoLayout, InfoSection } from "@/components/site/InfoLayout";
import { categoryLabel, sizeGuide } from "@/data/sizeGuide";

export const metadata: Metadata = {
  title: "Size guide",
  description: "How to measure and find your size in Swolvation long sleeves and tees.",
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <InfoLayout
      current="/size-guide"
      title="Size guide"
      intro={<p>The easiest way to find your size: measure a shirt you already love, then compare it with the charts below.</p>}
    >
      <InfoSection title="How to measure">
        <ul className="space-y-2">
          {sizeGuide.howToMeasure.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </InfoSection>

      {(Object.keys(sizeGuide.charts) as (keyof typeof sizeGuide.charts)[]).map((category) => (
        <InfoSection key={category} title={categoryLabel[category]}>
          <SizeChart category={category} />
        </InfoSection>
      ))}

      <InfoSection title="Still not sure?">
        <p>
          Tell us your usual size and how you like things to fit, and we&rsquo;ll point you to the right one.{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact us
          </Link>
        </p>
      </InfoSection>
    </InfoLayout>
  );
}
