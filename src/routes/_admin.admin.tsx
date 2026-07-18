import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_admin/admin")({
  head: () => ({ meta: buildPageMeta({ title: "Admin", description: "CreatorVault admin console." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Admin"
      title="Admin console"
      description="Operational tooling for CreatorVault administrators. Enabled in a later phase."
    />
  ),
});
