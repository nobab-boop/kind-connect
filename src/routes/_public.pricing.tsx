import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ResponsiveContainer, PageWrapper, PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { buildPageMeta } from "@/lib/seo";
import { PRICING } from "@/lib/marketing";

export const Route = createFileRoute("/_public/pricing")({
  head: () => ({
    meta: buildPageMeta({
      title: "Pricing",
      description:
        "Simple, affordable plans for Bangladeshi creators. Free, Pro monthly, and credit packs.",
    }),
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageWrapper className="py-16 sm:py-20">
      <ResponsiveContainer>
        <PageHeader
          eyebrow="Pricing"
          title="Plans built for creators"
          description="Start free, upgrade when you're shipping every week, or top up with credit packs."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col gap-6 rounded-2xl border p-6 ${
                p.highlight
                  ? "border-foreground/40 bg-card/70"
                  : "border-border/60 bg-card/40"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-foreground">{p.name}</h3>
                  {p.highlight ? (
                    <span className="rounded-full border border-foreground/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-foreground">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {p.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.cadence}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>

              <ul className="flex flex-col gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={p.highlight ? "default" : "outline"}
                className="mt-auto"
              >
                <Link to="/sign-up">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Prices in BDT. Taxes may apply. All plans include Bangla + English support.
        </p>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
