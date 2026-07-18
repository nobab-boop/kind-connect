import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ContentCard,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getExpert } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_dashboard/experts/$slug")({
  loader: ({ params }) => {
    const expert = getExpert(params.slug);
    if (!expert) throw notFound();
    return { expert };
  },
  head: ({ loaderData }) => ({
    meta: buildPageMeta({
      title: loaderData ? `${loaderData.expert.name} — Prompt Expert` : "Prompt Expert",
      description: loaderData?.expert.description ?? "CreatorVault Prompt Expert.",
    }),
  }),
  notFoundComponent: ExpertNotFound,
  errorComponent: ({ error }) => (
    <PageWrapper>
      <ResponsiveContainer>
        <ContentCard>
          <div className="text-sm text-muted-foreground">{error.message}</div>
        </ContentCard>
      </ResponsiveContainer>
    </PageWrapper>
  ),
  component: ExpertDetails,
});

function ExpertDetails() {
  const { expert } = Route.useLoaderData();

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-8">
        <div className="text-xs text-muted-foreground">
          <Link to="/experts" className="hover:text-foreground">Prompt Experts</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{expert.name}</span>
        </div>

        {/* Hero */}
        <ContentCard className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl" aria-hidden>
              {expert.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {expert.name}
                </h1>
                <Badge variant="outline">{expert.difficulty}</Badge>
                <Badge variant="secondary">{expert.category}</Badge>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {expert.description}
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                Estimated generation time · {expert.estimatedTime}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Button size="lg">
              <Sparkles className="mr-2 h-4 w-4" /> Start Generating
            </Button>
            <div className="text-[11px] text-muted-foreground">Generation ships in a later phase.</div>
          </div>
        </ContentCard>

        {/* Platforms + Output types */}
        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Supported AI platforms
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {expert.platforms.map((p) => (
                <Badge key={p} variant="secondary">{p}</Badge>
              ))}
            </div>
          </ContentCard>
          <ContentCard>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Output types
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {expert.outputs.map((o) => (
                <Badge key={o} variant="outline">{o}</Badge>
              ))}
            </div>
          </ContentCard>
        </div>

        {/* Workflow */}
        <ContentCard>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Workflow overview
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {expert.workflow.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="text-xs text-muted-foreground">Step {i + 1}</div>
                <div className="mt-1 text-sm font-medium text-foreground">{step.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </ContentCard>

        {/* Example outputs (placeholders) */}
        <ContentCard>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Example outputs
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {expert.examples.map((ex) => (
              <div key={ex.title} className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-4">
                <div className="text-sm font-medium text-foreground">{ex.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{ex.summary}</p>
                <div className="mt-3 h-24 rounded-md bg-muted" aria-hidden />
              </div>
            ))}
          </div>
        </ContentCard>

        {/* FAQs */}
        <ContentCard>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-4">
            {expert.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ContentCard>
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function ExpertNotFound() {
  return (
    <PageWrapper>
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Not found"
          title="Prompt Expert not found"
          description="This expert doesn't exist or has been retired."
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
