import type { Metadata } from "next";
import Link from "next/link";
import { InfoLayout, InfoSection } from "@/components/site/InfoLayout";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";
import { checkoutMethod } from "@/lib/commerce/checkout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What information Swolvation collects, why, and the choices you have.",
  alternates: { canonical: "/privacy" },
};

export const dynamic = "force-dynamic";

/*
 * Plain-language draft describing what this website actually does. Have it
 * reviewed (for example against GDPR/CCPA if they apply to you) before launch,
 * and update it if you add analytics, ads or other tools.
 */
export default function PrivacyPage() {
  const method = checkoutMethod();
  const processor = method === "shopify" ? "Shopify" : method === "stripe" ? "Stripe" : "our payment provider";

  return (
    <InfoLayout
      current="/privacy"
      title="Privacy policy"
      updated="Draft. This policy will be reviewed and finalized before launch."
      intro={<p>We collect as little as we need to run the shop, and we don&rsquo;t sell your information.</p>}
    >
      <InfoSection title="Who we are">
        <p>
          This website is run by {business.legalName ?? <Pending>[registered business name]</Pending>}
          {business.address ? `, ${business.address}` : null}. Questions about this policy can be sent through our{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact page
          </Link>
          .
        </p>
      </InfoSection>

      <InfoSection title="What we collect and why">
        <p>
          <strong className="font-medium text-ink">Messages you send us.</strong> When you use the contact form we receive your
          name, email address, topic, message and, if you include it, your order number. We use these only to reply to you.
        </p>
        <p>
          <strong className="font-medium text-ink">Email signup.</strong> If you join the email list, we keep your email address
          to send you news about releases and restocks. Every email includes a way to unsubscribe.
        </p>
        <p>
          <strong className="font-medium text-ink">Your cart.</strong> The items in your cart are saved in your own browser so
          they&rsquo;re still there when you come back. This stays on your device; it isn&rsquo;t sent to us until you check out.
        </p>
        <p>
          <strong className="font-medium text-ink">Orders and payment.</strong> Checkout takes place on {processor}&rsquo;s secure
          hosted page. They process your payment and shipping details and share with us what we need to fulfil your order. We never
          receive or store your full card number. {processor === "our payment provider" ? null : `${processor}'s own privacy policy also applies.`}
        </p>
      </InfoSection>

      <InfoSection title="Cookies and analytics">
        <p>
          This site doesn&rsquo;t use advertising or analytics cookies. Our hosting provider may keep standard server logs, such as IP
          addresses and browser type, to keep the site secure and running.
        </p>
      </InfoSection>

      <InfoSection title="Who we share it with">
        <p>
          We share information only with the services that help us run the shop, such as our hosting, email and payment providers,
          and only for that purpose. We don&rsquo;t sell or rent personal information.
        </p>
      </InfoSection>

      <InfoSection title="Your choices">
        <p>
          You can unsubscribe from emails at any time. To ask what we hold about you, or to have it corrected or deleted,{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact us
          </Link>
          .
        </p>
      </InfoSection>

      <InfoSection title="Changes to this policy">
        <p>If we change how we handle information, we&rsquo;ll update this page.</p>
      </InfoSection>
    </InfoLayout>
  );
}
