import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/faq")({
  head: () => ({
    meta: buildPageMeta({
      title: "FAQ",
      description: "Answers to common questions about CreatorVault.",
    }),
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="A curated FAQ will be published here alongside the public launch."
    />
  ),
});
