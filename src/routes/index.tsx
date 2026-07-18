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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-surface),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <section className="relative z-10 mx-auto w-full max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {APP.name}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Project Foundation Successfully Initialized
        </p>
      </section>
    </main>
  );
}

