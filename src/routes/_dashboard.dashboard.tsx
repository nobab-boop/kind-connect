import { createFileRoute, Link } from "@tanstack/react-router";
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
  MOCK_USER,
  MOCK_ANNOUNCEMENTS,
  MOCK_WEEKLY_UPDATES,
  MOCK_CREDIT_SUMMARY,
  MOCK_GENERATIONS,
  MOCK_FAVORITES,
  PROMPT_EXPERTS_EXTENDED,
  getExpert,
} from "@/lib/mock-data";
import { ArrowUpRight, Sparkles, Clock, Zap } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: buildPageMeta({
      title: "Dashboard",
      description: "Your CreatorVault dashboard — experts, credits, and recent generations.",
    }),
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const recentlyUsed = MOCK_GENERATIONS.slice(0, 3)
    .map((g) => getExpert(g.expertSlug))
    .filter(Boolean)
    .slice(0, 3);

  const featured = PROMPT_EXPERTS_EXTENDED.slice(0, 4);
  const credits = MOCK_CREDIT_SUMMARY;
  const usagePct = Math.min(
    100,
    Math.round((credits.usageThisMonth / credits.monthlyAllowance) * 100),
  );

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-8">
        <PageHeader
          eyebrow={`Welcome back, ${MOCK_USER.displayName.split(" ")[0]}`}
          title="Your creator workspace"
          description="Pick a Prompt Expert, re-run a favorite, or jump back into a recent generation."
          actions={
            <Button asChild>
              <Link to="/experts">
                <Sparkles className="mr-2 h-4 w-4" /> Explore experts
              </Link>
            </Button>
          }
        />

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction to="/experts" label="Browse experts" hint="9 available" icon={<Sparkles className="h-4 w-4" />} />
          <QuickAction to="/favorites" label="Open favorites" hint={`${MOCK_FAVORITES.length} saved`} icon={<Zap className="h-4 w-4" />} />
          <QuickAction to="/history" label="Recent generations" hint={`${MOCK_GENERATIONS.length} total`} icon={<Clock className="h-4 w-4" />} />
          <QuickAction to="/credits" label="View credits" hint={`${credits.remaining} left`} icon={<ArrowUpRight className="h-4 w-4" />} />
        </div>

        {/* Two-column: recent + credit summary */}
        <div className="grid gap-6 lg:grid-cols-3">
          <ContentCard className="lg:col-span-2">
            <SectionHeading title="Recent generations" href="/history" linkLabel="View all" />
            <ul className="mt-4 divide-y divide-border/60">
              {MOCK_GENERATIONS.slice(0, 4).map((g) => {
                const expert = getExpert(g.expertSlug);
                return (
                  <li key={g.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-xl" aria-hidden>
                        {expert?.icon ?? "✨"}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-foreground">
                          {expert?.name ?? g.expertSlug}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{g.preview}</div>
                      </div>
                    </div>
                    <StatusBadge status={g.status} />
                  </li>
                );
              })}
            </ul>
          </ContentCard>

          <ContentCard>
            <SectionHeading title="Credit summary" href="/credits" linkLabel="Manage" />
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-foreground">{credits.remaining}</div>
              <div className="text-xs text-muted-foreground">credits left</div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Used {credits.usageThisMonth}</span>
                <span>of {credits.monthlyAllowance}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground/80"
                  style={{ width: `${usagePct}%` }}
                  aria-label={`Used ${usagePct}%`}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Renews {credits.renewsOn}</div>
            </div>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/pricing">Upgrade plan</Link>
            </Button>
          </ContentCard>
        </div>

        {/* Recently used experts */}
        {recentlyUsed.length > 0 ? (
          <section className="flex flex-col gap-4">
            <SectionHeading title="Recently used experts" href="/experts" linkLabel="See all" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyUsed.map((e) => e ? <ExpertMiniCard key={e.slug} expert={e} /> : null)}
            </div>
          </section>
        ) : null}

        {/* Featured experts */}
        <section className="flex flex-col gap-4">
          <SectionHeading title="Featured Prompt Experts" href="/experts" linkLabel="See all" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((e) => (
              <ExpertMiniCard key={e.slug} expert={e} />
            ))}
          </div>
        </section>

        {/* Weekly updates + announcements */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ContentCard>
            <SectionHeading title="This week on CreatorVault" />
            <ul className="mt-4 space-y-4">
              {MOCK_WEEKLY_UPDATES.map((u) => (
                <li key={u.title} className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-foreground">{u.title}</div>
                  <div className="text-sm text-muted-foreground">{u.description}</div>
                </li>
              ))}
            </ul>
          </ContentCard>
          <ContentCard>
            <SectionHeading title="Announcements" />
            <ul className="mt-4 space-y-4">
              {MOCK_ANNOUNCEMENTS.map((a) => (
                <li key={a.title} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {a.date}
                    </Badge>
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.body}</p>
                </li>
              ))}
            </ul>
          </ContentCard>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function QuickAction({
  to,
  label,
  hint,
  icon,
}: {
  to: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-foreground/40 hover:bg-card"
    >
      <div className="flex flex-col">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:text-foreground">
        {icon}
      </div>
    </Link>
  );
}

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
      {href && linkLabel ? (
        <Link to={href} className="text-xs text-muted-foreground hover:text-foreground">
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

function ExpertMiniCard({ expert }: { expert: typeof PROMPT_EXPERTS_EXTENDED[number] }) {
  return (
    <Link
      to="/experts/$slug"
      params={{ slug: expert.slug }}
      className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-foreground/40 hover:bg-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl" aria-hidden>{expert.icon}</span>
        <Badge variant="outline" className="text-[10px]">{expert.difficulty}</Badge>
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{expert.name}</div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{expert.description}</p>
      </div>
      <div className="mt-auto text-xs text-muted-foreground">
        {expert.estimatedTime} · {expert.outputs.join(", ")}
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
    Draft: "bg-amber-500/15 text-amber-500 border-amber-500/20",
    Failed: "bg-red-500/15 text-red-500 border-red-500/20",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[status] ?? ""}`}
    >
      {status}
    </span>
  );
}
