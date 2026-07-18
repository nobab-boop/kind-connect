import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/common";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: buildPageMeta({
      title: "Contact",
      description: "Get in touch with the CreatorVault team.",
    }),
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Contact"
      title="Get in touch"
      description="Contact channels and support workflows will be enabled here in a later phase."
    />
  ),
});
