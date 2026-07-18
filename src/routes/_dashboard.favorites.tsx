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
import { MOCK_FAVORITES, getExpert } from "@/lib/mock-data";
import { Heart, Search, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/favorites")({
  head: () => ({
    meta: buildPageMeta({
      title: "Favorites",
      description: "Your saved CreatorVault Prompt Experts.",
    }),
  }),
  component: FavoritesPage,
});

type SortKey = "recent" | "name";

function FavoritesPage() {
  const [items, setItems] = useState(MOCK_FAVORITES);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const mapped = items
      .map((f) => ({ ...f, expert: getExpert(f.expertSlug)! }))
      .filter((r) => r.expert);
    const filtered = q
      ? mapped.filter(
          (r) =>
            r.expert.name.toLowerCase().includes(q) ||
            r.expert.description.toLowerCase().includes(q),
        )
      : mapped;
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.expert.name.localeCompare(b.expert.name);
      return b.savedAt.localeCompare(a.savedAt);
    });
  }, [items, query, sort]);

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Library"
          title="Favorites"
          description="Save experts you use often and re-open them in one click."
        />

        {items.length > 0 ? (
          <ContentCard className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search favorites"
                  className="pl-9"
                  aria-label="Search favorites"
                />
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-44" aria-label="Sort favorites">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently saved</SelectItem>
                  <SelectItem value="name">Name (A–Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </ContentCard>
        ) : null}

        {rows.length === 0 ? (
          <EmptyState
            title={items.length === 0 ? "No favorites yet" : "No favorites match your search"}
            description={
              items.length === 0
                ? "Open any Prompt Expert and save it to see it here."
                : "Try a different keyword or clear the search field."
            }
            action={
              <Button asChild variant="outline">
                <Link to="/experts">Browse experts</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => (
              <div
                key={r.expertSlug}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden>{r.expert.icon}</span>
                  <Badge variant="outline">{r.expert.difficulty}</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{r.expert.name}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {r.expert.description}
                  </p>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  <Heart className="mr-1 inline h-3 w-3" /> Saved {r.savedAt}
                </div>
                <div className="mt-auto flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to="/experts/$slug" params={{ slug: r.expertSlug }}>Open</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Remove ${r.expert.name} from favorites`}
                    onClick={() =>
                      setItems((prev) => prev.filter((x) => x.expertSlug !== r.expertSlug))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </PageWrapper>
  );
}
