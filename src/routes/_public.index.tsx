import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ResponsiveContainer, PageWrapper } from "@/components/common";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: buildPageMeta({
      title: `${APP.name} — ${APP.tagline}`,
      description: APP.description,
      standaloneTitle: true,
    }),
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <PageWrapper className="py-16 sm:py-24">
      <ResponsiveContainer>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            CreatorVault
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Expert prompt engineering,
            <br />
            without writing prompts.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {APP.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/sign-up">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/features">Explore features</Link>
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
