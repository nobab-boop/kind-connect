import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_dashboard/billing")({
  head: () => ({ meta: buildPageMeta({ title: "Billing", description: "Billing and invoices." }) }),
  component: () => (
    <PlaceholderPage
      eyebrow="Billing"
      title="Billing"
      description="Manage payment methods, subscriptions and invoices. Available in a later phase."
    />
  ),
});
