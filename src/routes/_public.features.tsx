import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { buildPageMeta } from "@/lib/seo";
import { FEATURES } from "@/lib/marketing";

export const Route = createFileRoute("/_public/features")({
  head: () => ({
    meta: buildPageMeta({
      title: "Features",
      description:
        "Guided prompt generation, Prompt Experts, randomized outputs, multi-AI compatibility, and more.",
    }),
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Features"
          title="Everything you need to ship AI content"
          description="CreatorVault removes the guesswork from prompting so you can focus on creating."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <h3 className="text-base font-medium text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/sign-up">Start free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/prompt-experts">Browse Prompt Experts</Link>
          </Button>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
