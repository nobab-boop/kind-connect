import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({ meta: buildPageMeta({ title: "Dashboard", description: "Your CreatorVault dashboard." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Dashboard"
      title="Dashboard"
      description="Your activity, credits and recent workflows will live here."
    />
  ),
});
