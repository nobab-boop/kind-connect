import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ContentCard,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { buildPageMeta } from "@/lib/seo";
import { PromptExpertRunner } from "@/components/prompt-engine/PromptExpertRunner";
import { getExpertDefinition } from "@/lib/prompt-engine/experts";

export const Route = createFileRoute("/_dashboard/experts/$slug/run")({
  loader: ({ params }) => {
    const expert = getExpertDefinition(params.slug);
    if (!expert) throw notFound();
    return { expert };
  },
  head: ({ loaderData }) => ({
    meta: buildPageMeta({
      title: loaderData ? `Run ${loaderData.expert.name}` : "Run Prompt Expert",
      description: loaderData?.expert.description ?? "Run a CreatorVault Prompt Expert.",
    }),
  }),
  notFoundComponent: RunnerNotFound,
  errorComponent: ({ error }) => (
    <PageWrapper>
      <ResponsiveContainer>
        <ContentCard>
          <div className="text-sm text-muted-foreground">{error.message}</div>
        </ContentCard>
      </ResponsiveContainer>
    </PageWrapper>
  ),
  component: RunnerPage,
});

function RunnerPage() {
  const { expert } = Route.useLoaderData() as {
    expert: NonNullable<ReturnType<typeof getExpertDefinition>>;
  };
  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-6">
        <div className="text-xs text-muted-foreground">
          <Link to="/experts" className="hover:text-foreground">Prompt Experts</Link>
          <span className="mx-2">/</span>
          <Link
            to="/experts/$slug"
            params={{ slug: expert.slug }}
            className="hover:text-foreground"
          >
            {expert.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Run</span>
        </div>
        <PromptExpertRunner expert={expert} />
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function RunnerNotFound() {
  return (
    <PageWrapper>
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Not found"
          title="Prompt Expert not available"
          description="This Prompt Expert isn't wired to the engine yet."
        />
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/experts">Back to experts</Link>
          </Button>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
