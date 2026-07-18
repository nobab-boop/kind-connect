import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, Wand2, Layers } from "lucide-react";
import { ResponsiveContainer } from "@/components/common";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";
import { buildPageMeta } from "@/lib/seo";
import {
  PROMPT_EXPERTS,
  AI_PLATFORMS,
  COMPARISON,
  TESTIMONIALS,
  PRICING,
  FAQS,
} from "@/lib/marketing";

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

function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-20 sm:py-28 ${className}`}>
      <ResponsiveContainer>
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-3 text-center">
            {eyebrow ? (
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </ResponsiveContainer>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.foreground/10),transparent_60%)]" />
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-24 text-center sm:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Built for Bangladeshi AI creators
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Expert prompt engineering,
              <br />
              <span className="text-muted-foreground">without writing prompts.</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {APP.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/sign-up">
                  Get started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/prompt-experts">See Prompt Experts</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Why CreatorVault */}
      <Section
        eyebrow="Why CreatorVault"
        title="Prompting is hard. Creating shouldn't be."
        description="Most creators lose hours guessing prompt wording, tweaking parameters, and rerunning generations. CreatorVault removes the guesswork entirely."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              Icon: Wand2,
              title: "No prompt writing",
              body: "Answer guided questions. We compose the prompt for you.",
            },
            {
              Icon: Layers,
              title: "Consistent results",
              body: "Purpose-built experts keep every output on-brand and on-topic.",
            },
            {
              Icon: Sparkles,
              title: "Ready for every tool",
              body: "Prompts formatted for ChatGPT, Gemini, Veo, ElevenLabs, and more.",
            },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <Icon className="h-5 w-5 text-foreground" />
              <h3 className="mt-4 text-base font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section
        eyebrow="How it works"
        title="Three steps to a production-ready prompt"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose a Prompt Expert",
              body: "Pick from experts like AI Food, Storytelling, or Horror.",
            },
            {
              step: "02",
              title: "Answer guided questions",
              body: "Simple questions in Bangla or English — no prompt jargon.",
            },
            {
              step: "03",
              title: "Get a ready prompt",
              body: "Copy and paste directly into ChatGPT, Veo, or your tool of choice.",
            },
          ].map(({ step, title, body }) => (
            <div
              key={step}
              className="relative rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <div className="text-xs font-mono text-muted-foreground">{step}</div>
              <h3 className="mt-3 text-base font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured experts */}
      <Section
        eyebrow="Prompt Experts"
        title="Purpose-built for the content you actually make"
        description="Each expert encodes the structure, tone, and platform quirks a professional prompt engineer would use."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROMPT_EXPERTS.slice(0, 6).map((e) => (
            <div
              key={e.slug}
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-foreground">{e.name}</h3>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {e.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {e.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/prompt-experts">Browse all experts</Link>
          </Button>
        </div>
      </Section>

      {/* Platforms */}
      <Section
        eyebrow="Works with"
        title="Every major AI platform"
        description="CreatorVault formats prompts for the platform you're targeting — no cleanup required."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {AI_PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border/60 bg-card/40 py-6 text-center"
            >
              <span className="text-sm font-medium text-foreground">{p.name}</span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {p.kind}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section
        eyebrow="Manual vs CreatorVault"
        title="Why creators switch"
      >
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <div className="grid grid-cols-2 border-b border-border/60 bg-muted/20 text-sm">
            <div className="px-6 py-3 font-medium text-muted-foreground">Manual prompting</div>
            <div className="px-6 py-3 font-medium text-foreground">With CreatorVault</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-b border-border/60 text-sm last:border-b-0"
            >
              <div className="px-6 py-4 text-muted-foreground">{row.manual}</div>
              <div className="flex items-center gap-2 px-6 py-4 text-foreground">
                <Check className="h-4 w-4 text-foreground/70" />
                {row.creatorvault}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="Creators" title="Loved by early creators">
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.handle}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex flex-col text-xs">
                <span className="font-medium text-foreground">{t.name}</span>
                <span className="text-muted-foreground">{t.handle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Pricing preview */}
      <Section
        eyebrow="Pricing"
        title="Simple plans, built for creators"
        description="Start free. Upgrade when you're shipping every week."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col gap-4 rounded-2xl border p-6 ${
                p.highlight
                  ? "border-foreground/40 bg-card/70"
                  : "border-border/60 bg-card/40"
              }`}
            >
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
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/pricing">Compare plans</Link>
          </Button>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section eyebrow="FAQ" title="Answers, before you ask">
        <div className="mx-auto max-w-3xl divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40">
          {FAQS.slice(0, 4).map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                {f.q}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="ghost">
            <Link to="/faq">Read all FAQs</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-border/60">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-24 text-center sm:py-32">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to skip the prompt guesswork?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              Join creators using CreatorVault to ship consistent, professional AI content — every week.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/sign-up">Start free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
