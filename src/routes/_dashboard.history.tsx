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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_GENERATIONS, getExpert } from "@/lib/mock-data";
import { Copy, Search } from "lucide-react";

export const Route = createFileRoute("/_dashboard/history")({
  head: () => ({
    meta: buildPageMeta({
      title: "Recent Generations",
      description: "Your recent CreatorVault generations.",
    }),
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_GENERATIONS.filter((g) => {
      const expert = getExpert(g.expertSlug);
      const matches =
        !q ||
        expert?.name.toLowerCase().includes(q) ||
        g.preview.toLowerCase().includes(q) ||
        g.platform.toLowerCase().includes(q);
      const matchesStatus = status === "all" || g.status === status;
      return matches && matchesStatus;
    });
  }, [query, status]);

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-6">
        <PageHeader
          eyebrow="History"
          title="Recent Generations"
          description="Every prompt you've generated in CreatorVault, with status and metadata."
        />

        <ContentCard className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search history"
                className="pl-9"
                aria-label="Search history"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ContentCard>

        {rows.length === 0 ? (
          <EmptyState
            title="No generations found"
            description="Try a different keyword or clear the filters."
            action={
              <Button asChild variant="outline">
                <Link to="/experts">Open an expert</Link>
              </Button>
            }
          />
        ) : (
          <ContentCard className="p-0">
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt Expert</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Output</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((g) => {
                    const e = getExpert(g.expertSlug);
                    return (
                      <TableRow key={g.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg" aria-hidden>{e?.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-foreground">{e?.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1 max-w-sm">
                                {g.preview}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(g.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm">{g.platform}</TableCell>
                        <TableCell className="text-sm">{g.outputType}</TableCell>
                        <TableCell><StatusBadge status={g.status} /></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" aria-label="Copy prompt">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {/* Mobile list */}
            <ul className="divide-y divide-border/60 md:hidden">
              {rows.map((g) => {
                const e = getExpert(g.expertSlug);
                return (
                  <li key={g.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-start gap-2">
                        <span className="text-xl" aria-hidden>{e?.icon}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground">{e?.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{g.preview}</div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            {g.platform} · {g.outputType} · {new Date(g.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={g.status} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </ContentCard>
        )}
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant: Record<string, string> = {
    Completed: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
    Draft: "bg-amber-500/15 text-amber-500 border-amber-500/20",
    Failed: "bg-red-500/15 text-red-500 border-red-500/20",
  };
  return (
    <Badge className={`border ${variant[status] ?? ""}`} variant="outline">
      {status}
    </Badge>
  );
}
