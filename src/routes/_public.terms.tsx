import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { APP } from "@/lib/constants";

export const Route = createFileRoute("/_public/terms")({
  head: () => ({
    meta: buildPageMeta({
      title: "Terms of Service",
      description: `Terms of Service for ${APP.name}.`,
    }),
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Legal"
          title="Terms of Service"
          description="Placeholder terms. Final legal copy will replace this before public launch."
        />
        <article className="prose prose-invert mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {[
            {
              h: "1. Acceptance of Terms",
              p: `By accessing or using ${APP.name}, you agree to be bound by these Terms of Service and our Privacy Policy.`,
            },
            {
              h: "2. Use of the Service",
              p: "You may use CreatorVault only in compliance with these terms and all applicable laws. You are responsible for the content you generate and how you use it.",
            },
            {
              h: "3. Accounts",
              p: "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
            },
            {
              h: "4. Subscriptions & Credits",
              p: "Paid plans and credit packs are billed as described on the pricing page. Credits do not expire unless otherwise noted.",
            },
            {
              h: "5. Content Ownership",
              p: "You retain ownership of the content you create using CreatorVault. We claim no rights over your generated outputs.",
            },
            {
              h: "6. Prohibited Use",
              p: "You may not use CreatorVault to generate content that is illegal, harmful, deceptive, or violates the rights of others.",
            },
            {
              h: "7. Termination",
              p: "We may suspend or terminate access to the service for violations of these terms.",
            },
            {
              h: "8. Changes",
              p: "We may update these terms from time to time. Continued use of the service constitutes acceptance of the updated terms.",
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
