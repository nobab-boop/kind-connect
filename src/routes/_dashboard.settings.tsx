import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({ meta: buildPageMeta({ title: "Settings", description: "CreatorVault account settings." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Settings"
      title="Settings"
      description="Account preferences, notifications and integrations. Available in a later phase."
    />
  ),
});
