import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { Input } from "@/components/ui/input";
import { buildPageMeta } from "@/lib/seo";
import { PROMPT_EXPERTS } from "@/lib/marketing";

export const Route = createFileRoute("/_public/prompt-experts")({
  head: () => ({
    meta: buildPageMeta({
      title: "Prompt Experts",
      description:
        "Browse purpose-built Prompt Experts for food, storytelling, horror, ads, and more.",
    }),
  }),
  component: PromptExpertsPage,
});

const CATEGORIES = ["All", "Lifestyle", "Family", "Narrative", "Cinematic", "Comedy", "Marketing", "Educational"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

function PromptExpertsPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Prompt Experts"
          title="Purpose-built experts for every kind of content"
          description="Each expert encodes the structure, tone, and platform quirks a professional prompt engineer would use."
        />

        <div className="mt-10 flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              disabled
              placeholder="Search experts (coming soon)"
              className="pl-9"
              aria-label="Search Prompt Experts"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                type="button"
                disabled
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  i === 0
                    ? "border-foreground/40 bg-foreground/10 text-foreground"
                    : "border-border/60 text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d, i) => (
              <button
                key={d}
                type="button"
                disabled
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  i === 0
                    ? "border-foreground/40 bg-foreground/10 text-foreground"
                    : "border-border/60 text-muted-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROMPT_EXPERTS.map((e) => (
            <article
              key={e.slug}
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-medium text-foreground">{e.name}</h3>
                <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {e.difficulty}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {e.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-[11px] text-muted-foreground">
                <span className="uppercase tracking-[0.14em]">Outputs</span>
                <div className="flex gap-1.5">
                  {e.outputs.map((o) => (
                    <span
                      key={o}
                      className="rounded-md bg-muted/40 px-1.5 py-0.5 text-foreground/80"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
