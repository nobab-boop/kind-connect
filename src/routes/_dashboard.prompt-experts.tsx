import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/prompt-experts")({
  head: () => ({ meta: buildPageMeta({ title: "Prompt Experts", description: "Curated Prompt Experts." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Prompt Experts"
      title="Prompt Experts"
      description="Browse the library of proprietary Prompt Experts across content categories."
    />
  ),
});
