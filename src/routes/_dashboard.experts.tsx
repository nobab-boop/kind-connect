import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ContentCard,
  EmptyState,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List as ListIcon, Search } from "lucide-react";
import {
  EXPERT_CATEGORIES,
  PROMPT_EXPERTS_EXTENDED,
  type PromptExpertExtended,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/experts")({
  head: () => ({
    meta: buildPageMeta({
      title: "Prompt Experts",
      description: "Search and open any CreatorVault Prompt Expert.",
    }),
  }),
  component: ExpertsDirectory,
});

type SortKey = "name" | "difficulty" | "time";

const DIFFICULTY_ORDER: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

function ExpertsDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = PROMPT_EXPERTS_EXTENDED.filter((e) => {
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      const matchesCategory = category === "all" || e.category === category;
      return matchesQuery && matchesCategory;
    });
    items = [...items].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "difficulty")
        return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
      return a.estimatedTime.localeCompare(b.estimatedTime);
    });
    return items;
  }, [query, category, sort]);

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Library"
          title="Prompt Experts"
          description="Purpose-built experts tuned per platform and output type."
        />

        <ContentCard className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search experts, categories, or keywords"
                className="pl-9"
                aria-label="Search prompt experts"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40" aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {EXPERT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-40" aria-label="Sort">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A–Z)</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                </SelectContent>
              </Select>
              <div className="inline-flex overflow-hidden rounded-md border border-border/60">
                <Button
                  type="button"
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Showing {filtered.length} of {PROMPT_EXPERTS_EXTENDED.length} experts
          </div>
        </ContentCard>

        {filtered.length === 0 ? (
          <EmptyState
            title="No experts match your search"
            description="Try clearing filters or searching a different keyword."
            action={
              <Button variant="outline" onClick={() => { setQuery(""); setCategory("all"); }}>
                Reset filters
              </Button>
            }
          />
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => <ExpertCard key={e.slug} expert={e} />)}
          </div>
        ) : (
          <ContentCard className="p-0">
            <ul className="divide-y divide-border/60">
              {filtered.map((e) => <ExpertRow key={e.slug} expert={e} />)}
            </ul>
          </ContentCard>
        )}
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function ExpertCard({ expert }: { expert: PromptExpertExtended }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="flex items-start justify-between">
        <span className="text-3xl" aria-hidden>{expert.icon}</span>
        <Badge variant="outline">{expert.difficulty}</Badge>
      </div>
      <div>
        <h3 className="text-base font-medium text-foreground">{expert.name}</h3>
        <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{expert.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {expert.platforms.map((p) => (
          <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{expert.outputs.join(" · ")}</span>
        <span>{expert.estimatedTime}</span>
      </div>
      <Button asChild className="mt-auto w-full" variant="outline">
        <Link to="/experts/$slug" params={{ slug: expert.slug }}>Open Expert</Link>
      </Button>
    </div>
  );
}

function ExpertRow({ expert }: { expert: PromptExpertExtended }) {
  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-2xl" aria-hidden>{expert.icon}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-medium text-foreground">{expert.name}</div>
            <Badge variant="outline" className="text-[10px]">{expert.difficulty}</Badge>
          </div>
          <div className="truncate text-xs text-muted-foreground">{expert.description}</div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {expert.platforms.join(", ")} · {expert.outputs.join(", ")} · {expert.estimatedTime}
          </div>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link to="/experts/$slug" params={{ slug: expert.slug }}>Open</Link>
      </Button>
    </li>
  );
}
