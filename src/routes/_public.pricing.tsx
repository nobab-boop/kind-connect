import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/pricing")({
  head: () => ({
    meta: buildPageMeta({
      title: "Pricing",
      description:
        "Simple, affordable plans built for Bangladeshi AI creators. Pricing details coming soon.",
    }),
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Pricing"
      title="Plans built for creators"
      description="Transparent pricing designed for Bangladeshi creators. Detailed tiers arrive in a later phase."
    />
  ),
});
