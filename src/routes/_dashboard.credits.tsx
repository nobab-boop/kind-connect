import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/credits")({
  head: () => ({ meta: buildPageMeta({ title: "Credits", description: "Manage your CreatorVault credits." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Credits"
      title="Credits"
      description="Track credit balance, usage history and top-ups. Available in a later phase."
    />
  ),
});
