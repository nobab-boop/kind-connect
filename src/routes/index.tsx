import { createFileRoute } from "@tanstack/react-router";

import { APP } from "../lib/constants";
import { buildPageMeta } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildPageMeta({
      title: `${APP.name} — ${APP.tagline}`,
      description: APP.description,
      standaloneTitle: true,
    }),
  }),
  component: Index,
});

function Index() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient background — subtle, non-decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-surface),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <section className="relative z-10 mx-auto w-full max-w-xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Foundation initialized
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {APP.name}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {APP.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Phase 1 complete. Global theme, design tokens, typography, layout, error
          boundary, toast, SEO and accessibility foundations are in place. Product
          features arrive in upcoming phases.
        </p>
      </section>
    </main>
  );
}
