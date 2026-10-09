import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SizeChart } from "@/components/product/SizeChart";
import { infoPages, type InfoTopic } from "@/data/info";

type Props = { params: Promise<{ topic: string }> };

function isTopic(topic: string): topic is InfoTopic {
  return topic in infoPages;
}

export function generateStaticParams() {
  return Object.keys(infoPages).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  const page = infoPages[topic];
  return { title: page.title, description: page.description, alternates: { canonical: `/info/${topic}` } };
}

export default async function InfoPage({ params }: Props) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();
  const page = infoPages[topic];

  return (
    <div data-tone="light" className="gutter min-h-[80vh] bg-bone pb-32 pt-32 md:pt-44">
      <div className="max-w-2xl">
        <h1 className="fraktur text-[3.25rem] md:text-[5rem]">{page.title}</h1>
        {page.sections.map((section) => (
          <section key={section.heading} className="mt-14">
            <h2 className="text-lg">{section.heading}</h2>
            {section.body.map((para) => (
              <p key={para} className="mt-4 max-w-[62ch] text-charcoal">
                {para}
              </p>
            ))}
          </section>
        ))}
        {topic === "size-guide" && (
          <section className="mt-14">
            <h2 className="text-lg">Measurements</h2>
            <div className="mt-6">
              <SizeChart />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
