import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { APP } from "@/lib/constants";

export const Route = createFileRoute("/_public/privacy")({
  head: () => ({
    meta: buildPageMeta({
      title: "Privacy Policy",
      description: `Privacy Policy for ${APP.name}.`,
    }),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Legal"
          title="Privacy Policy"
          description="Placeholder privacy policy. Final legal copy will replace this before public launch."
        />
        <article className="prose prose-invert mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {[
            {
              h: "1. Information We Collect",
              p: `${APP.name} collects the information you provide when you create an account, use the service, or contact us.`,
            },
            {
              h: "2. How We Use Information",
              p: "We use your information to operate CreatorVault, personalize your experience, improve the product, and communicate with you.",
            },
            {
              h: "3. Data Sharing",
              p: "We do not sell your personal information. We share data only with service providers who help us operate CreatorVault, and only as necessary.",
            },
            {
              h: "4. Data Retention",
              p: "We retain your data only for as long as needed to provide the service or as required by law.",
            },
            {
              h: "5. Security",
              p: "We use industry-standard measures to protect your information. No system is 100% secure, but we take security seriously.",
            },
            {
              h: "6. Your Rights",
              p: "You may access, correct, or delete your personal data at any time by contacting our support team.",
            },
            {
              h: "7. Cookies",
              p: "We use cookies and similar technologies to keep you signed in and understand how the service is used.",
            },
            {
              h: "8. Changes to This Policy",
              p: "We may update this policy. We'll notify you of material changes through the service or via email.",
            },
          ].map((s) => (
            <section key={s.h} className="mb-8">
              <h2 className="text-base font-medium text-foreground">{s.h}</h2>
              <p className="mt-2">{s.p}</p>
            </section>
          ))}
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </article>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
