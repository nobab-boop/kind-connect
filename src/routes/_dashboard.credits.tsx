import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ContentCard,
  PageHeader,
  PageWrapper,
  ResponsiveContainer,
} from "@/components/common";
import { buildPageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { MOCK_CREDIT_SUMMARY, MOCK_USER } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/credits")({
  head: () => ({
    meta: buildPageMeta({
      title: "Credits",
      description: "Your CreatorVault credit balance and usage.",
    }),
  }),
  component: CreditsPage,
});

function CreditsPage() {
  const c = MOCK_CREDIT_SUMMARY;
  const usagePct = Math.min(100, Math.round((c.usageThisMonth / c.monthlyAllowance) * 100));
  const maxDaily = Math.max(...c.dailyUsage.map((d) => d.used));

  return (
    <PageWrapper>
      <ResponsiveContainer className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Account"
          title="Credits"
          description="Track how many credits you have and how you're using them."
          actions={
            <Button asChild>
              <Link to="/pricing">Upgrade plan</Link>
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat title="Remaining credits" value={c.remaining.toLocaleString()} hint={`Renews ${c.renewsOn}`} />
          <Stat title="Monthly allowance" value={c.monthlyAllowance.toLocaleString()} hint={`${MOCK_USER.plan} plan`} />
          <Stat title="Purchased credits" value={c.purchasedCredits.toLocaleString()} hint="Never expires" />
        </div>

        <ContentCard>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            This month
          </h2>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-3xl font-semibold text-foreground">{c.usageThisMonth}</div>
            <div className="text-sm text-muted-foreground">of {c.monthlyAllowance} used</div>
          </div>
          <div className="mt-3">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-foreground/80" style={{ width: `${usagePct}%` }} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{usagePct}% used</div>
          </div>
        </ContentCard>

        <ContentCard>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Credit usage — last 7 days
          </h2>
          <div className="mt-4 flex h-40 items-end gap-3">
            {c.dailyUsage.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-foreground/80"
                  style={{ height: `${(d.used / maxDaily) * 100}%` }}
                  aria-label={`${d.day}: ${d.used} credits`}
                />
                <div className="text-[11px] text-muted-foreground">{d.day}</div>
              </div>
            ))}
          </div>
        </ContentCard>

        <ContentCard className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Need more credits?</div>
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro for unlimited generations or top up with a credit pack.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/pricing">Compare plans</Link>
            </Button>
            <Button asChild>
              <Link to="/pricing">Buy credits</Link>
            </Button>
          </div>
        </ContentCard>
      </ResponsiveContainer>
    </PageWrapper>
  );
}

function Stat({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <ContentCard>
      <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </ContentCard>
  );
}
