import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/workspace")({
  head: () => ({ meta: buildPageMeta({ title: "Workspace", description: "Your CreatorVault workspace." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Workspace"
      title="Workspace"
      description="Your guided prompt workflows will be built and organized here."
    />
  ),
});
