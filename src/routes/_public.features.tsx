import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/features")({
  head: () => ({
    meta: buildPageMeta({
      title: "Features",
      description:
        "Explore the guided workflows, Prompt Experts, and creator tooling that power CreatorVault.",
    }),
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Features"
      title="What CreatorVault does"
      description="A curated overview of the guided workflows and Prompt Experts that will live here."
    />
  ),
});
