import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
 * Layout primitives — generic, reusable building blocks.
 * ============================================================ */

export function ResponsiveContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function PageWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-h-full w-full flex-col gap-8 py-8 sm:py-10", className)}>
      {children}
    </div>
  );
}

export function SectionContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("flex w-full flex-col gap-6", className)}>{children}</section>
  );
}

/* ============================================================
 * Content primitives
 * ============================================================ */

export function PageTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </div>
        ) : null}
        <PageTitle>{title}</PageTitle>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function ContentCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <ContentCard className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action}
    </ContentCard>
  );
}

export function LoadingPlaceholder({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center gap-3 rounded-xl border border-dashed border-border/60 bg-muted/20 px-6 py-12 text-sm text-muted-foreground",
        className,
      )}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/60" />
      {label}…
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-border/60", className)} />;
}

/* ============================================================
 * Placeholder page — used by every "coming in future phases" route.
 * ============================================================ */

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <PageWrapper>
      <ResponsiveContainer>
        <PageHeader
          eyebrow={eyebrow ?? "CreatorVault"}
          title={title}
          description={description}
        />
        <div className="mt-8">
          <ContentCard className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Roadmap
            </div>
            <h2 className="text-lg font-medium text-foreground">
              Coming in future phases
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              This surface is scaffolded. Functionality will be delivered in an
              upcoming phase of the CreatorVault roadmap.
            </p>
          </ContentCard>
        </div>
      </ResponsiveContainer>
    </PageWrapper>
  );
}
